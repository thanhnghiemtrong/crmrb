# Opportunities Management (Cơ hội kinh doanh) - Requirements Document

## Overview
Module quản lý Cơ hội kinh doanh (Opportunities) dành cho Relationship Manager (RM) của TPBank CRM Mobile. Cho phép RM xem danh sách, chi tiết, tạo mới và quản lý pipeline các cơ hội bán hàng với hỗ trợ AI analytics.

**Target Device:** iPhone 17 Pro Max (430x932px)
**Design System:** Digital Banker (Manrope font, Brand Purple #390259, Accent Orange #FC7728)
**Navigation:** Accessible từ More menu trên Bottom Navigation. Cross-links: `dashboard.html`, `cus360.html`, `leads.html`, `tasks.html`

---

## FR-O1: Top AppBar (Opportunity List)

### FR-O1.1: Header Layout
- Fixed sticky top, z-index 50, background white, shadow-sm, border-b border-slate-100
- Left: Avatar RM (40x40px, rounded-full, border-2 border-primary-fixed) + Title "Cơ hội kinh doanh" (font-bold text-lg text-primary)
- Right: Search icon button + Notifications icon button (with red badge dot for unread)
- **Acceptance Criteria:**
  - Tap Search → mở search overlay/input field để tìm kiếm opportunity theo tên KH, sản phẩm
  - Tap Notifications → mở danh sách thông báo liên quan
  - Badge ẩn khi không có thông báo mới
  - Avatar hiển thị ảnh RM hoặc fallback icon "person"

---

## FR-O2: Filter Tabs

### FR-O2.1: Horizontal Scrollable Filter Chips
- Container: overflow-x-auto, no-scrollbar, horizontal scroll
- Chips: Trạng thái (active - bg-primary-container text-white), Sản phẩm, Ưu tiên, Sắp hết hạn
- Active chip: bg-primary-container text-white font-bold rounded-full shadow-sm
- Inactive chip: bg-white border border-outline-variant text-on-surface-variant rounded-full
- **Acceptance Criteria:**
  - Tap chip → toggle active state, filter danh sách theo tiêu chí
  - Chỉ 1 chip active tại 1 thời điểm
  - Tap "Trạng thái" → mở bottom sheet với các pipeline statuses (Chưa xử lý, Thu thập hồ sơ, Phê duyệt, Đã đóng)
  - Tap "Sản phẩm" → filter theo loại sản phẩm (Thẻ tín dụng, Vay mua nhà, Tiết kiệm, Vay tiêu dùng)
  - Tap "Ưu tiên" → filter chỉ hiện starred opportunities
  - Tap "Sắp hết hạn" → filter opportunities có ngày đóng dự kiến trong 7 ngày tới

### FR-O2.2: Filter Bottom Sheet (Trạng thái)
- Overlay: bg-black/30, z-[80]
- Sheet: bg-white rounded-t-3xl, drag handle, title "Lọc theo trạng thái"
- Options: Tất cả, Chưa xử lý, Thu thập hồ sơ, Phê duyệt, Đã đóng (Won/Lost)
- **Acceptance Criteria:**
  - Tap option → apply filter, close sheet, update chip label
  - Tap overlay → close without applying
  - Drag down → close sheet

---

## FR-O3: KPI Summary Cards

### FR-O3.1: KPI Grid (2 columns)
- Grid 2 cột, gap-3
- Card 1: "Tổng giá trị dự kiến"
  - Label: text-label-sm text-slate-500
  - Value: text-headline-sm font-bold text-primary (format: 1.250.000.000)
  - Trend: text-[10px] text-green-600 font-bold "+12% vs tháng trước"
- Card 2: "Cơ hội mới"
  - Label: text-label-sm text-slate-500
  - Value: text-headline-sm font-bold text-primary (24)
  - Alert: text-[10px] text-secondary-container font-bold "4 cần xử lý gấp"
- Card style: bg-white p-4 rounded-xl border border-slate-100 shadow-sm
- **Acceptance Criteria:**
  - Values cập nhật khi filter thay đổi
  - Tap card "Tổng giá trị" → scroll to opportunity list
  - Tap "4 cần xử lý gấp" → filter danh sách chỉ hiện urgent items
  - Format số tiền VND với dấu chấm phân cách hàng nghìn

---

## FR-O4: Opportunity Cards List

### FR-O4.1: Card Layout
- Container: space-y-4
- Each card: bg-white rounded-xl p-4 border border-slate-100 shadow-sm, cursor-pointer, active:scale-[0.99] transition-all
- Card content:
  - **Header row:** Customer name (font-headline-sm text-on-surface) + Star icon (yellow-500, filled) for priority
  - **Product line:** Material icon (16px) + product name (text-body-md text-slate-500)
  - **Value section:**
    - "Giá trị dự kiến" label (text-label-sm text-slate-400)
    - Amount (text-body-lg font-bold text-primary) format VND
    - "Ngày đóng dự kiến" label + date value
  - **Status chip:** rounded-full, text-label-md
    - Chưa xử lý: bg-surface-container text-on-surface-variant
    - Thu thập hồ sơ: bg-blue-100 text-blue-800
    - Phê duyệt: bg-green-100 text-green-700
  - **Win Rate badge:** flex items-center gap-1.5, rounded-full
    - High (≥80%): bg-green-50 text-green-700
    - Medium (50-79%): bg-blue-50 text-blue-700
    - Low (<50%): bg-orange-50 text-orange-700
    - Icon: psychology (filled, 18px) + "Tỷ lệ Win XX%"
  - **Warning tags** (optional): border-t border-slate-50, pt-3
    - "Cần follow-up": bg-yellow-50 text-yellow-700, icon priority_high

- **Acceptance Criteria:**
  - Tap card → navigate to Detail view (view-detail)
  - Star icon toggle on tap (add/remove priority)
  - Cards sorted by: Priority (starred first) → Status → Date
  - Minimum 3 cards visible, scrollable for more
  - Product icons: credit_card (Thẻ), home_filled (Vay nhà), savings (Tiết kiệm), payments (Vay tiêu dùng)

---

## FR-O5: AI Analytics Card

### FR-O5.1: AI Prediction Card
- Container: bg-primary-container p-6 rounded-2xl text-white, relative overflow-hidden
- Background decoration: large auto_awesome icon (opacity-20, absolute top-right)
- Content (relative z-10):
  - Title: "Phân tích từ AI" (text-headline-sm font-bold)
  - Prediction text: text-body-md opacity-90 (e.g., "Dựa trên dữ liệu 7 ngày qua, bạn có khả năng chốt 12 cơ hội trị giá 450tr trong tuần tới.")
  - CTA button: "Xem gợi ý chi tiết" (bg-secondary-container text-white rounded-full font-bold text-label-md px-6 py-2)
- **Acceptance Criteria:**
  - Tap "Xem gợi ý chi tiết" → mở AI detail view hoặc bottom sheet với recommendations
  - AI content cập nhật hàng ngày dựa trên pipeline data
  - Card luôn hiển thị ở cuối danh sách (sau opportunity cards)

---

## FR-O6: FAB (Floating Action Button)

### FR-O6.1: Create Opportunity FAB
- Position: fixed bottom-24 right-[calc(50%-215px+24px)] (inside device frame)
- Style: w-14 h-14 bg-secondary-container text-white rounded-full shadow-lg shadow-orange-300 z-40
- Icon: add (28px)
- **Acceptance Criteria:**
  - Tap → navigate to Create view (view-create)
  - Active:scale-90 transition-transform on press
  - Only visible on List view
  - FAB hides when scrolling down, shows when scrolling up (optional enhancement)

---

## FR-O7: Opportunity Detail View

### FR-O7.1: Detail AppBar
- Back button (arrow_back) → return to List view
- Title: "Chi tiết Cơ hội" (font-bold text-lg text-primary)
- More menu button (more_vert) → dropdown with actions
- **Acceptance Criteria:**
  - Tap Back → showView('view-list')
  - Tap more_vert → show dropdown: Chỉnh sửa, Xóa, Chia sẻ, Xuất PDF

### FR-O7.2: Customer Identity Section
- Card: bg-white p-6 rounded-xl border border-slate-100 shadow-sm, flex items-center gap-4
- Avatar: w-16 h-16 rounded-full, ring-2 ring-primary-fixed, object-cover
- Online indicator: absolute bottom-0 right-0, w-4 h-4 bg-green-500 rounded-full border-2 border-white
- Name: font-headline-sm text-on-surface
- Product: icon (16px, filled) + text (font-label-md text-on-surface-variant)
- **Acceptance Criteria:**
  - Avatar fallback: initials on colored background if no image
  - Online status: green = online, gray = offline
  - Tap name → navigate to cus360.html with customer context

### FR-O7.3: Pipeline Progress Stepper
- 4 steps horizontal: Chưa xử lý → Thu thập hồ sơ → Phê duyệt → Đã đóng
- Step states:
  - Completed: bg-purple-100 text-purple-700, icon check_circle (filled)
  - Active: w-10 h-10 bg-primary-container text-white, shadow-md ring-4 ring-primary-fixed, icon description (filled)
  - Pending: bg-slate-100 text-slate-400, icon pending
- Connector lines: completed = bg-purple-200, pending = bg-slate-200
- Labels: text-[10px] font-bold, active = text-purple-900, others = text-slate-400
- **Acceptance Criteria:**
  - Visual progress reflects current opportunity stage
  - Tap on completed step → show timestamp of completion
  - Cannot skip steps (sequential progression only)

### FR-O7.4: AI Insights Premium Card
- Container: col-span-2 bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-5 text-white shadow-lg, relative overflow-hidden
- Background glow: absolute -right-10 -top-10 bg-white/5 w-40 h-40 rounded-full blur-3xl
- Badge: "PHÂN TÍCH AI" in bg-white/10 px-3 py-1 rounded-full backdrop-blur-md, icon auto_awesome (filled, sm)
- Metrics:
  - "Xác suất chốt": text-4xl font-black (e.g., 85%)
  - "Doanh số dự kiến": text-2xl font-bold (e.g., 50.000.000 VND)
- AI Quote: bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10, text-sm text-purple-50
- **Acceptance Criteria:**
  - AI metrics update based on interaction history and customer profile
  - Quote provides actionable recommendation
  - Xác suất chốt color: ≥80% white, 50-79% yellow-200, <50% red-200

### FR-O7.5: Quick Actions Grid
- Grid 4 columns, gap-3
- Each button: flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-slate-100 shadow-sm, active:scale-95
- Actions:
  - Gọi điện: icon call, bg-blue-50 text-blue-600
  - Nhắn tin: icon chat, bg-green-50 text-green-600
  - Hẹn gặp: icon calendar_month, bg-orange-50 text-orange-600
  - Ghi chú: icon sticky_note_2, bg-purple-50 text-purple-600
- Label: text-[11px] font-bold text-on-surface-variant
- **Acceptance Criteria:**
  - Gọi điện → open device dialer with customer phone
  - Nhắn tin → open SMS/messaging app
  - Hẹn gặp → create new task/event linked to this opportunity
  - Ghi chú → open note editor/bottom sheet

### FR-O7.6: Detailed Information Table
- Container: bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden
- Header: p-4 border-b border-slate-50 bg-slate-50/50, title "Thông tin chi tiết" (font-headline-sm)
- Rows: divide-y divide-slate-50, each row p-4 grid grid-cols-2
  - Label: text-sm text-slate-500
  - Value: text-sm font-semibold text-right text-on-surface
- Fields: Sản phẩm, Giới tính, Quốc tịch, Ngày sinh, Số điện thoại, Địa chỉ thường trú, Địa chỉ tạm trú, Địa chỉ hiện tại, Thời gian cư trú, Nghề nghiệp, Chức danh, Thu nhập bình quân, Giá trị/Hạn mức, Loại tiền, Ngày tiếp nhận, Ngày dự kiến đóng, Nguồn, Lý do từ chối
- **Acceptance Criteria:**
  - SĐT masked: 0912 xxx 456 (security)
  - "Lý do từ chối" shows "N/A" if not rejected
  - Thu nhập format: XX.000.000 VND
  - Scrollable within the card if content overflows

### FR-O7.7: Interaction History Timeline
- Header: "Lịch sử tương tác" + "Xem tất cả" link (text-purple-700 text-xs font-bold uppercase)
- Timeline items: relative pl-8 pb-4
  - Vertical line: absolute left-[11px] top-2 bottom-0 w-0.5 bg-slate-100
  - Icon circle: absolute left-0, w-6 h-6 rounded-full, colored by type
    - Call: bg-blue-100 text-blue-600
    - Document: bg-purple-100 text-purple-600
    - Email: bg-green-100 text-green-600
    - Meeting: bg-orange-100 text-orange-600
  - Content card: bg-white p-3 rounded-xl border border-slate-100
    - Title (text-sm font-bold) + timestamp (text-[10px] text-slate-400)
    - Description (text-xs text-on-surface-variant)
- **Acceptance Criteria:**
  - Show latest 3 interactions, "Xem tất cả" for full history
  - Sorted by most recent first
  - Each entry shows relative time (e.g., "2 giờ trước", "Hôm qua")

### FR-O7.8: Bottom Action Buttons
- Container: fixed bottom-0, w-[430px], p-4 pb-8, bg-white/90 backdrop-blur-md border-t border-slate-100, z-50 rounded-b-[40px]
- Layout: flex gap-3
  - "Chuyển thành Account": flex-[2] h-14 bg-secondary-container text-white font-bold rounded-2xl shadow-lg shadow-orange-200, icon person_add
  - Edit button: w-14 h-14 border-2 border-primary text-primary rounded-2xl, icon edit
- **Acceptance Criteria:**
  - Tap "Chuyển thành Account" → show confirmation dialog
  - Tap Edit → navigate to Create view pre-filled with current data (edit mode)
  - Both buttons: active:scale-[0.98] transition-all

---

## FR-O8: Create/Edit Opportunity View

### FR-O8.1: Create AppBar
- Left: Close button (icon close) → return to List view with confirmation if form dirty
- Center: Title "Tạo Opportunity Mới" (or "Chỉnh sửa Cơ hội" in edit mode)
- Right: "Reset" text button → clear all form fields
- **Acceptance Criteria:**
  - Close with unsaved changes → show confirmation dialog "Bạn có muốn hủy? Dữ liệu chưa lưu sẽ mất."
  - Reset → clear all fields, show toast "Đã reset form"
  - In edit mode, title changes to "Chỉnh sửa Cơ hội"

### FR-O8.2: Hero Banner
- Container: relative w-full h-32 rounded-xl overflow-hidden shadow-sm
- Background: image with gradient overlay (bg-gradient-to-r from-primary/80 to-transparent)
- Text overlay: "Thêm cơ hội kinh doanh mới cho khách hàng" (text-white font-headline-sm max-w-[200px])
- **Acceptance Criteria:**
  - Purely decorative, no interaction
  - Hidden in edit mode (optional)

### FR-O8.3: Form Sections
- Section indicator: orange left-border (w-1 h-6 bg-secondary-container rounded-full) + section title (font-headline-sm text-primary)
- Section container: bg-white p-4 rounded-xl shadow-sm border border-outline-variant/30

**Section 1: Thông tin chung**
- Sản phẩm (select): Options - Vay tiêu dùng, Thẻ tín dụng, Tiền gửi tiết kiệm, Vay mua nhà
- Nguồn (select): Options - Trực tiếp tại quầy, Kênh Digital, Giới thiệu (Referral), Facebook Leads

**Section 2: Thông tin khách hàng**
- Họ và tên (text input, required)
- Ngày sinh (date input)
- Giới tính (select: Nam, Nữ, Khác)
- Quốc tịch (select: Việt Nam, Khác)
- Số điện thoại (tel input, format 0xxx xxx xxx)
- Số định danh CCCD/CMND (text input)

**Section 3: Thông tin địa chỉ**
- Địa chỉ thường trú (text input)
- Địa chỉ tạm trú (text input)
- Địa chỉ hiện tại (text input)
- Thời gian cư trú tại địa chỉ hiện tại (text input, e.g., "5 năm")

**Section 4: Thông tin nghề nghiệp**
- Nghề nghiệp (text input)
- Chức danh (text input)
- Thu nhập bình quân (number input, suffix "VND")

**Section 5: Chi tiết cơ hội**
- Giá trị/Hạn mức đề xuất (number input, suffix "VND")
- Loại tiền (select: VND, USD, EUR)
- Ngày tiếp nhận (date input)
- Ngày dự kiến đóng (date input)

**Section 6: Ghi chú**
- Textarea (4 rows, placeholder "Nhập ghi chú thêm về khách hàng hoặc cơ hội...")

- **Acceptance Criteria:**
  - All inputs: h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant, focus:border-primary focus:ring-1
  - Select inputs have expand_more icon (absolute right-3)
  - Required fields marked with * in label
  - Validation: Họ tên required, SĐT format valid, Ngày dự kiến đóng >= Ngày tiếp nhận
  - In edit mode: pre-fill all fields with existing data
  - Number inputs format with thousand separators on blur

### FR-O8.4: Submit Button
- Container: fixed bottom-0, w-[430px], p-4 pb-8, bg-white/90 backdrop-blur-md border-t shadow z-50 rounded-b-[40px]
- Button: w-full h-14 bg-secondary-container text-white rounded-2xl font-bold text-headline-sm shadow-lg, icon add_circle (filled)
- Text: "Tạo Cơ hội" (create mode) / "Lưu thay đổi" (edit mode)
- **Acceptance Criteria:**
  - Tap → validate form → if valid: save, navigate to list, show success toast
  - If invalid: show error toast + highlight invalid fields with border-error
  - Button disabled (opacity-50) while submitting
  - active:scale-[0.98] transition-transform

---

## FR-O9: Toast Messages

### FR-O9.1: Success Toasts
- Create success: "✓ Tạo cơ hội thành công! Opportunity mới đã được thêm."
- Edit success: "✓ Cập nhật cơ hội thành công!"
- Convert to Account: "✓ Đã chuyển thành Account thành công! Chuyển sang trang Customer 360."
- **Acceptance Criteria:**
  - Auto-dismiss after 4 seconds
  - Close button (X) to dismiss manually
  - Slide-down animation on appear
  - Style: bg-green-50 border-green-200 text-green-800, icon check_circle (filled)

### FR-O9.2: Error Toasts
- Validation error: "⚠ Vui lòng điền đầy đủ thông tin bắt buộc."
- Network error: "✕ Không thể kết nối. Vui lòng thử lại."
- **Acceptance Criteria:**
  - Style: bg-red-50 border-red-200 text-error, icon error (filled)
  - Persist until manually dismissed for critical errors

---

## FR-O10: Confirmation Dialogs

### FR-O10.1: Convert to Account Dialog
- Title: "Chuyển thành Account?"
- Body: "Xác nhận chuyển cơ hội của [Tên KH] thành Account chính thức? Hành động này không thể hoàn tác."
- Actions: "Xác nhận" (bg-secondary-container text-white) + "Hủy" (text-primary)
- **Acceptance Criteria:**
  - Confirm → close dialog, show success toast, navigate to cus360.html
  - Cancel → close dialog, stay on detail view

### FR-O10.2: Delete Opportunity Dialog
- Title: "Xóa cơ hội?"
- Body: "Bạn có chắc muốn xóa cơ hội này? Dữ liệu sẽ không thể khôi phục."
- Actions: "Xóa" (bg-error text-white) + "Hủy" (text-primary)
- **Acceptance Criteria:**
  - Confirm → delete, navigate to list, show toast "Đã xóa cơ hội"
  - Cancel → close dialog

### FR-O10.3: Discard Changes Dialog
- Title: "Hủy thay đổi?"
- Body: "Bạn có muốn hủy? Dữ liệu chưa lưu sẽ mất."
- Actions: "Hủy thay đổi" (bg-error text-white) + "Tiếp tục chỉnh sửa" (text-primary)

---

## FR-O11: More Menu Actions (Detail View)

### FR-O11.1: More Vert Dropdown
- Trigger: more_vert button on Detail AppBar
- Options:
  - Chỉnh sửa (icon edit) → navigate to edit mode
  - Chia sẻ (icon share) → native share sheet
  - Xuất PDF (icon picture_as_pdf) → generate PDF report
  - Xóa (icon delete, text-error) → show delete confirmation
- **Acceptance Criteria:**
  - Dropdown appears below button, bg-white rounded-xl shadow-lg border
  - Tap outside → close dropdown
  - Each option has icon + label, py-3 px-4

---

## FR-O12: Empty States

### FR-O12.1: No Opportunities
- Icon: trending_up (48px, text-slate-300)
- Title: "Chưa có cơ hội nào" (text-headline-sm text-slate-500)
- Description: "Tạo cơ hội kinh doanh mới để bắt đầu theo dõi pipeline." (text-body-md text-slate-400)
- CTA: "Tạo cơ hội mới" button (bg-secondary-container text-white rounded-xl)
- **Acceptance Criteria:**
  - Shown when list is empty (no data or filter returns 0 results)
  - CTA tap → navigate to Create view

### FR-O12.2: No Filter Results
- Icon: filter_list_off (48px, text-slate-300)
- Title: "Không tìm thấy kết quả"
- Description: "Thử thay đổi bộ lọc để xem thêm cơ hội."
- CTA: "Xóa bộ lọc" → reset all filters

---

## FR-O13: Bottom Navigation

### FR-O13.1: Navigation Bar
- Fixed bottom, 5 tabs: Home, Cus360, Leads, Tasks, More
- Links: dashboard.html, cus360.html, leads.html, tasks.html, # (toggleMoreMenu)
- Active state: None highlighted (Opportunities accessed via More menu)
- More tab triggers bottom sheet menu
- **Acceptance Criteria:**
  - Bottom nav visible only on List view
  - Hidden on Detail and Create views (replaced by action buttons)
  - Safe area padding (pb-6) for notch devices

### FR-O13.2: More Menu Bottom Sheet
- Overlay: bg-black/30 z-[80]
- Sheet: bg-white rounded-t-3xl shadow-2xl z-[85], drag handle, title "Thêm chức năng"
- Grid 3 cols:
  - Opportunities (active - highlighted): icon trending_up, bg-purple-100, text-primary
  - Sales Support: icon support_agent, bg-orange-100, text-secondary-container
  - Cases: icon folder_open, bg-blue-100, text-blue-600
- **Acceptance Criteria:**
  - Opportunities item shows active/current state (e.g., ring or bg highlight)
  - Tap Sales Support → navigate to sales-support page
  - Tap Cases → navigate to cases page
  - Tap overlay → close menu

---

## FR-O14: Cross-Navigation

### FR-O14.1: Navigation Links
- From Opportunity List:
  - Bottom nav Home → dashboard.html
  - Bottom nav Cus360 → cus360.html
  - Bottom nav Leads → leads.html
  - Bottom nav Tasks → tasks.html
- From Opportunity Detail:
  - "Chuyển thành Account" → cus360.html (with customer context)
  - Tap customer name → cus360.html
  - Quick action "Hẹn gặp" → tasks.html (create task)
- **Acceptance Criteria:**
  - All navigation links functional
  - Back navigation returns to previous view state
  - Deep link support: opportunities.html?id={opp_id} opens detail directly

---

## FR-O15: Edit Flow

### FR-O15.1: Edit Opportunity
- Entry points: Detail view Edit button, More menu "Chỉnh sửa"
- Behavior: Navigate to Create view with all fields pre-filled
- AppBar title: "Chỉnh sửa Cơ hội"
- Submit button text: "Lưu thay đổi"
- **Acceptance Criteria:**
  - All existing data populated in form fields
  - Changed fields tracked for dirty state
  - Save → validate → update → navigate to detail → show success toast
  - Cancel/Close with changes → show discard confirmation dialog

---

## Non-Functional Requirements

### NFR-O1: Performance
- List view load < 2s on 4G connection
- Smooth scrolling 60fps with 50+ opportunity cards
- Card tap → Detail view transition < 300ms
- Form submission response < 3s
- Lazy load: Cards below fold load on scroll (virtual scrolling for large lists)

### NFR-O2: Offline Support
- Display cached opportunity list when offline
- Show "Offline" badge in header when no connection
- Queue create/edit actions for sync when online
- AI Analytics card shows "Cập nhật khi có kết nối" in offline mode
- Last sync timestamp displayed

### NFR-O3: Security
- Customer SĐT masked in list and detail views (0912 xxx 456)
- CCCD/CMND never displayed in full (only last 4 digits)
- Session validation on page load
- Auto-logout after 15 minutes inactive
- Sensitive data encrypted in local cache
- Role-based access: Only assigned RM can edit/delete their opportunities

### NFR-O4: Accessibility
- Touch targets ≥ 48x48px for all interactive elements
- Color contrast ≥ 4.5:1 for text
- Pipeline stepper has aria-labels for screen readers
- Form inputs have associated labels
- Toast messages announced by screen reader
- Focus management on view transitions

### NFR-O5: Data Validation
- Phone number: Vietnamese format (10 digits, starts with 0)
- Amount fields: Positive numbers only, max 999.999.999.999
- Date fields: Cannot select past dates for "Ngày dự kiến đóng"
- Required fields: Sản phẩm, Họ tên, SĐT, Giá trị/Hạn mức
- Real-time validation feedback (on blur)

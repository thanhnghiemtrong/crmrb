# Tasks Management - Requirements Document

## Overview
Module quản lý Công việc & Nhắc việc dành cho RM TPBank trên mobile. Bao gồm 3 màn hình: Danh sách công việc, Chi tiết công việc, và Tạo công việc mới. Module giúp RM theo dõi lịch trình, quản lý tasks hàng ngày, check-in tại điểm hẹn, và nhận gợi ý AI về ưu tiên xử lý.

**Target Device:** iPhone 17 Pro Max (430x932px)
**Design System:** Digital Banker (Manrope, Primary #390259, CTA Orange #FC7728)
**Navigation:** Link từ Bottom Nav "Tasks" tab, link sang `dashboard.html`, `cus360.html`, `leads.html`

---

## FR-T1: Màn hình Danh sách Công việc (Task List)

### FR-T1.1: Top AppBar
- Avatar RM (32x32, rounded-full) + Title "Công việc & Nhắc việc"
- Search icon + Notification icon (với red dot badge)

### FR-T1.2: KPI Overview Cards
- Grid 2 cột:
  - "Task hôm nay": Số lượng (headline-lg, primary) + delta so với đầu ngày (+X, green)
  - "Quá hạn": Số lượng (headline-lg, red-700) + label "Cần xử lý" — card background red-50
- **Acceptance Criteria:**
  - Dữ liệu realtime
  - Tap "Quá hạn" → filter danh sách chỉ hiện tasks quá hạn

### FR-T1.3: Filter Tabs (Time-based)
- Horizontal scrollable pills:
  - **Hôm nay** (active: primary-container, white text, shadow)
  - Ngày mai (inactive: white, border)
  - Sắp tới (inactive)
  - Quá hạn (inactive)
- **Acceptance Criteria:**
  - Single select (radio behavior)
  - Active tab: bg-primary-container text-white shadow-md
  - Inactive: bg-white text-slate-500 border
  - Task list filter theo tab selected
  - Count badge trên mỗi tab (optional)

### FR-T1.4: AI Suggestion Card
- Gradient background (purple-50 to orange-50), border purple-100
- Icon auto_awesome (orange, filled) + "Gợi ý từ AI"
- Text gợi ý: AI khuyên RM nên xử lý task nào trước và lý do
- Highlight tên KH (bold, orange)
- **Acceptance Criteria:**
  - AI suggestion cập nhật mỗi sáng hoặc khi có task mới
  - Tap suggestion → scroll/highlight task được gợi ý
  - Dismiss suggestion (swipe hoặc X)

### FR-T1.5: Task Cards
- Mỗi task card bao gồm:
  - **Background color** theo priority/status:
    - High priority upcoming: bg-[#F2F5FF] (light purple)
    - Overdue: bg-[#FFF8F8] (light red) + red right border (4px)
    - Normal: bg-white
  - **Header row**: Type chip + Priority chip + Time (right-aligned)
    - Type chips: Gặp mặt (purple-100), Gọi điện (orange-100), Email (blue-100), Follow-up (slate-100)
    - Priority: Cao (red-100/red-600), Trung bình (amber-100), Thấp (không hiện)
  - **Content**: Tiêu đề task (body-lg, bold) + Location/Context (icon + text, slate-500)
  - **Footer row**: Status chip + Action buttons
    - Status: Sắp tới (blue-50/blue-600), Quá hạn (red-500/white), Đã lên lịch (slate-100/slate-500), Hoàn thành (green-100/green-700)
    - Actions: "Bắt đầu" (primary-container pill), "Gọi ngay" (orange pill + icon call), Directions (icon button), More (icon)
- **Acceptance Criteria:**
  - Tap card → navigate sang Chi tiết
  - Overdue tasks luôn hiện trên cùng
  - Swipe right → mark complete
  - Swipe left → snooze/reschedule
  - Long-press → context menu (Edit, Delete, Reschedule)

### FR-T1.6: FAB - Tạo công việc mới
- Fixed bottom-right (bottom-24, right-6)
- Background: orange (#F37021), icon "add" (white, 32px)
- Shadow: shadow-lg shadow-orange-300
- Tap → navigate sang Tạo công việc mới

---

## FR-T2: Màn hình Chi tiết Công việc (Task Detail)

### FR-T2.1: Top AppBar
- Back button + Title "Chi tiết công việc"
- More options (3-dot menu)

### FR-T2.2: Main Info Card
- Product chip (purple-100, primary text): VD "Vay mua nhà"
- Tiêu đề task (headline-sm, primary)
- Time box (right-aligned): Ngày + Giờ (body-lg, bold, primary)
- Duration: icon schedule + "Thời gian dự kiến: X phút"
- **Acceptance Criteria:**
  - Tap product chip → filter tasks cùng sản phẩm

### FR-T2.3: Check-in Button
- Full-width button (h-14, secondary-container/orange, white text)
- Icon location_on + "Check-in tại điểm hẹn"
- Shadow: shadow-lg shadow-orange-200
- **Acceptance Criteria:**
  - Tap → request GPS permission → verify location gần điểm hẹn (radius 200m)
  - Success: Toast "✓ Check-in thành công!" + update timeline
  - Fail (quá xa): Toast warning "⚠ Bạn đang cách điểm hẹn X km"
  - Disable sau khi đã check-in

### FR-T2.4: Status Timeline (Stepper)
- Horizontal 3 steps: Đã lên lịch → Đã check-in → Hoàn thành
- Visual states:
  - Completed: Solid primary circle + check icon + primary connecting line
  - Active: Border primary circle + dot inside
  - Upcoming: Border slate circle + empty
- **Acceptance Criteria:**
  - Auto-advance khi check-in thành công
  - RM có thể manual advance (tap step)

### FR-T2.5: Customer Details (Bento Layout)
- **Customer card** (col-span-2):
  - Avatar (64x64, rounded-full) + Tên KH (headline-sm, primary) + Tier badge (Gold/Platinum/Diamond) + SĐT
  - Call button (icon, rounded-full)
- **Address card** (col-span-2):
  - Icon pin_drop + Label "Địa chỉ gặp mặt" + Full address
  - "Mở Map" button (icon map + text, primary)
- **Acceptance Criteria:**
  - Tap tên KH → navigate sang `cus360.html`
  - Tap Call → mở dialer
  - Tap "Mở Map" → mở Google Maps/Apple Maps với directions

### FR-T2.6: Task Notes
- Icon description + "Ghi chú công việc"
- Note content trong card (bg-surface, border-left-4 primary, italic)
- **Acceptance Criteria:**
  - RM có thể edit note inline
  - Auto-save sau 2s idle

### FR-T2.7: AI Insights
- Premium card (bg-primary, text-white, rounded-2xl)
- Decorative blurs (purple, orange)
- Icon auto_awesome + "AI Insights"
- AI recommendation text (body-md, purple-100)
- Highlight sản phẩm gợi ý (bold, secondary-fixed)
- Confidence badge: "Độ tin cậy: X%" (green dot + white/10 background)
- **Acceptance Criteria:**
  - AI insights dựa trên lịch sử KH + context task
  - Tap → expand chi tiết reasoning

### FR-T2.8: Bottom Action Bar
- Grid 2 cột:
  - "Cập nhật ghi chú" (outlined, border-primary, icon edit_note)
  - "Hoàn thành" (filled, orange CTA, icon task_alt)
- **Acceptance Criteria:**
  - "Hoàn thành" → Confirmation: "Đánh dấu hoàn thành task này?"
  - Success → Toast "✓ Công việc đã hoàn thành!" → update status → navigate back
  - "Cập nhật ghi chú" → open edit note bottom sheet

---

## FR-T3: Màn hình Tạo Công việc Mới (Create Task)

### FR-T3.1: Top AppBar
- "Hủy" button (left, text, primary color)
- Title "Tạo công việc mới" (center)
- Spacer (right)

### FR-T3.2: AI Assistant Suggestion
- Card (purple-50, border purple-100, rounded-2xl)
- Icon auto_awesome (primary, filled) + "Gợi ý AI Assistant"
- Text: Gợi ý thời gian trống tốt nhất dựa trên lịch trình RM
- Highlight time (bold, primary)
- **Acceptance Criteria:**
  - AI scan calendar RM → suggest slot trống
  - Tap suggestion → auto-fill time field

### FR-T3.3: Form Fields
- **Tên công việc** (text, required): placeholder "Nhập tiêu đề công việc..."
- **Chọn khách hàng** (search input): icon person_search, search trong CRM
- **Loại công việc** (select): Gọi điện / Thăm viếng / Email / Follow-up
- **Thời gian** (datetime-local): icon event
- **Mức độ ưu tiên** (segmented control 3 options): Thấp / Trung bình / Cao
  - Active segment: bg-white, shadow-sm, text-on-surface
  - Inactive: transparent, text-on-surface-variant
  - Container: bg-surface-container-high, rounded-2xl, h-14
- **Ghi chú** (textarea, 4 rows): placeholder "Thêm mô tả chi tiết..."
- **Acceptance Criteria:**
  - Tên công việc required
  - KH search: debounce 300ms, show suggestions dropdown
  - Segmented control: single select, visual feedback immediate
  - All inputs: h-14, rounded-xl, border outline-variant, focus:ring primary

### FR-T3.4: Options Section
- Card (white, border, rounded-2xl)
- Toggle: "Đồng bộ với Outlook" + subtitle "Tự động thêm vào Outlook Calendar"
  - Icon sync (primary)
  - Toggle switch (checked by default, primary color when on)
- **Acceptance Criteria:**
  - Toggle state persisted
  - Khi on: Task sync sang Outlook Calendar sau khi tạo

### FR-T3.5: Bottom Action - Submit
- Fixed bottom, full-width button
- "Tạo công việc" + icon add_task (orange background, white text, rounded-2xl)
- Shadow: shadow-lg shadow-orange-500/20
- **Acceptance Criteria:**
  - Disable khi "Tên công việc" trống
  - Loading state khi submit
  - Success → Toast "✓ Tạo công việc thành công!" → navigate back to list
  - Error → Toast error "✗ Không thể tạo công việc. Thử lại."

---

## FR-T4: Toast Messages & Notifications

### FR-T4.1: Success Messages
- **Tạo task thành công:** "✓ Tạo công việc thành công! [Tên task] đã được thêm." — Action: "Xem chi tiết"
- **Hoàn thành task:** "✓ Công việc đã hoàn thành! Tốt lắm 🎉" — Duration 4s
- **Check-in thành công:** "✓ Check-in thành công tại [Địa điểm]." — Duration 3s
- **Cập nhật ghi chú:** "✓ Đã lưu ghi chú." — Duration 2s

### FR-T4.2: Error Messages
- **Lỗi tạo task:** "✗ Không thể tạo công việc. Vui lòng thử lại." — Action: "Thử lại"
- **Check-in fail (xa):** "⚠ Bạn đang cách điểm hẹn 2.5km. Vui lòng đến gần hơn." — Warning style
- **Lỗi mạng:** "⚠ Mất kết nối. Thao tác sẽ sync khi có mạng." — Persistent

### FR-T4.3: Reminder Notifications
- Push notification 15 phút trước task
- In-app reminder banner khi task sắp đến giờ (5 phút)

---

## FR-T5: Edit & Delete Task

### FR-T5.1: Edit Task
- Trigger: More menu → "Chỉnh sửa" hoặc long-press → "Sửa"
- Navigate sang form giống Create nhưng pre-filled
- Editable: Tên, KH, Loại, Thời gian, Ưu tiên, Ghi chú
- Non-editable: Mã task, Ngày tạo, Người tạo
- Save → Toast "✓ Đã cập nhật công việc."
- Unsaved changes warning khi back

### FR-T5.2: Delete Task
- Trigger: More menu → "Xoá"
- Confirmation dialog: "Xoá công việc này? Thao tác không thể hoàn tác."
- Buttons: "Xoá" (error) / "Giữ lại"
- Success → Toast "Đã xoá công việc." → back to list

### FR-T5.3: Reschedule Task
- Trigger: More menu → "Dời lịch" hoặc swipe left
- Bottom sheet: Date/time picker
- Success → Toast "✓ Đã dời lịch sang [new time]."

---

## FR-T6: More Menu (3-dot)

### FR-T6.1: Task Detail More Menu
- Chỉnh sửa → FR-T5.1
- Dời lịch → FR-T5.3
- Đánh dấu hoàn thành → same as bottom bar "Hoàn thành"
- Chia sẻ → Share sheet
- Xoá → FR-T5.2

---

## FR-T7: Empty States

### FR-T7.1: No Tasks Today
- Icon: event_available (64px, slate-300)
- Title: "Không có công việc hôm nay"
- Subtitle: "Bạn đã hoàn thành tất cả! Tạo công việc mới?"
- CTA: "Tạo công việc" (orange button)

### FR-T7.2: No Overdue
- Icon: check_circle (64px, green-300)
- Title: "Không có task quá hạn 🎉"
- Subtitle: "Tuyệt vời! Bạn đang on-track."

---

## FR-T8: Cross-Navigation

### FR-T8.1: Links
- Bottom Nav "Tasks" tab → Task List (`tasks.html`)
- Bottom Nav "Home" → `dashboard.html`
- Bottom Nav "Cus360" → `cus360.html`
- Bottom Nav "Leads" → `leads.html`
- Task card tap → Task Detail
- Customer name tap → `cus360.html`
- FAB → Create Task
- Back buttons → previous screen

---

## Non-Functional Requirements

### NFR-T1: Performance
- Task list load < 1.5s
- Check-in GPS response < 3s
- Form submission < 2s
- Smooth animations 60fps

### NFR-T2: Location Services
- GPS accuracy: ≤ 50m
- Check-in radius: 200m from meeting point
- Fallback: Manual check-in option if GPS unavailable

### NFR-T3: Calendar Integration
- Outlook Calendar sync (bi-directional)
- Google Calendar support (optional)
- Conflict detection: Warn if time slot already booked

### NFR-T4: Offline
- Task list cached offline
- Create task queued offline
- Check-in requires online (GPS verification)
- Offline indicator on AppBar

### NFR-T5: Notifications
- Push notifications: 15min before task
- In-app badge: Overdue count on Tasks tab
- Daily morning summary: "Bạn có X tasks hôm nay"

### NFR-T6: Security
- Check-in location data encrypted
- Audit log: task create/edit/complete/delete
- Role-based: RM chỉ thấy tasks của mình (Manager thấy team)

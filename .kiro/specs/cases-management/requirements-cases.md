# Cases Management - Requirements Document

## Overview
Module Quản lý Case (Cases Management) dành cho RM TPBank trên mobile. Bao gồm 3 màn hình: Danh sách Case, Chi tiết Case, và Tạo mới Case. Module giúp RM theo dõi, xử lý các yêu cầu/khiếu nại của khách hàng với SLA tracking realtime, timeline xử lý, và tích hợp đa kênh liên lạc.

**Target Device:** iPhone 17 Pro Max (430x932px)
**Design System:** Digital Banker (Manrope, Primary #390259, CTA Orange #FC7728)
**Navigation:** Link từ Bottom Nav "More" menu → Cases (active), link sang `dashboard.html`, `cus360.html`, `leads.html`, `tasks.html`, `opportunities.html`, `sales-support.html`

---

## FR-CS1: Màn hình Danh sách Case (Case List)

### FR-CS1.1: Top AppBar
- Back button (arrow_back, w-10 h-10, rounded-full, hover:bg-slate-50) → navigate back
- Title "Case Management" (font-extrabold, text-lg, text-primary)
- Search icon button (search, w-10 h-10, rounded-full, hover:bg-slate-50, text-slate-500)
- **Acceptance Criteria:**
  - Back button navigate về dashboard hoặc trang trước
  - Search icon toggle hiển thị search input

### FR-CS1.2: Search Input
- Full-width input below AppBar
- Placeholder: "Tìm khách hàng hoặc số điện thoại..."
- Icon search bên trái (text-outline)
- Style: h-12, rounded-xl, bg-white, border border-outline-variant, px-4 pl-12
- **Acceptance Criteria:**
  - Tìm kiếm theo tên KH hoặc số điện thoại
  - Debounce 300ms trước khi filter
  - Clear button (close icon) khi có text
  - Empty state khi không có kết quả

### FR-CS1.3: Filter Chips (Horizontal Scroll)
- Container: flex, overflow-x-auto, no-scrollbar, gap-2, pb-1
- Chip "Trạng thái" (active): bg-primary-container, text-white, rounded-full, text-label-md, font-bold, shadow-md
- Chip "Sắp hết hạn": bg-white, border border-outline-variant, text-on-surface-variant, rounded-full, text-label-md
- Chip "Ưu tiên": bg-white, border border-outline-variant, text-on-surface-variant, rounded-full, text-label-md
- **Acceptance Criteria:**
  - Chỉ 1 chip active tại 1 thời điểm (toggle)
  - Tap chip → filter danh sách case tương ứng
  - Active chip có visual distinction rõ ràng (purple bg + white text)
  - Horizontal scroll smooth trên mobile

### FR-CS1.4: KPI Summary Cards (Asymmetric Bento Grid)
- Layout: grid với left large card + right column (2 small cards stacked)
- **Left Large Card (Đang xử lý):**
  - bg-primary-container, text-white, rounded-xl, p-4
  - Icon: pending_actions (material-symbols-outlined, text-white/80)
  - Value: "12" (text-headline-lg, font-bold, text-white)
  - Label: "Đang xử lý" (text-label-md, text-white/80)
  - Chiếm 1 col, span 2 rows
- **Right Top Card (Quá hạn):**
  - bg-white, rounded-xl, p-3, border border-red-100
  - Icon: warning (text-error)
  - Value: "03" (text-headline-md, font-bold, text-error)
  - Label: "Quá hạn" (text-label-sm, text-error)
- **Right Bottom Card (Mới tạo):**
  - bg-secondary-container, text-white, rounded-xl, p-3
  - Icon: add_circle (text-white/80)
  - Value: "05" (text-headline-md, font-bold, text-white)
  - Label: "Mới tạo" (text-label-sm, text-white/80)
- **Acceptance Criteria:**
  - Bento layout responsive trong device frame 430px
  - Tap vào card → filter danh sách theo trạng thái tương ứng
  - Số liệu realtime từ CRM backend
  - Visual hierarchy: card lớn bên trái nhấn mạnh metric chính

### FR-CS1.5: Case Cards (List)
- Container: space-y-4
- Mỗi card có left color border (border-l-4):
  - error (red) = Quá hạn/Ưu tiên cao
  - primary-container (purple) = Đang xử lý
  - slate-300 = Hoàn tất
- Card structure:
  - **Row 1:** Case ID "CAS-001" (text-label-md, text-outline, font-mono) + Priority chip
    - Ưu tiên Cao: bg-error-container, text-error, text-label-sm, rounded-full, px-2 py-0.5
    - Ưu tiên Thường: bg-slate-100, text-slate-600, text-label-sm, rounded-full, px-2 py-0.5
  - **Row 2:** Customer name (text-body-lg, font-bold, text-on-surface)
  - **Row 3:** Status chip
    - Đang xử lý: bg-purple-50, text-primary, text-label-sm, rounded-full, px-3 py-1
    - Mới: bg-orange-50, text-secondary, text-label-sm, rounded-full, px-3 py-1
    - Hoàn tất: bg-green-50, text-green-700, text-label-sm, rounded-full, px-3 py-1
  - **Row 4:** Grid 2 cols
    - Left: Yêu cầu type (text-body-md, text-on-surface-variant) + Kênh tiếp nhận (text-label-sm, text-outline)
    - Right: SLA countdown
  - **SLA Display:**
    - Quá hạn: "Quá hạn 30p" (text-error, icon timer_off, font-semibold)
    - Còn thời gian: "Còn 2h 15p" (text-primary, icon schedule)
    - Đúng hạn: "Đúng hạn" (text-green-600, icon check_circle)
  - **Footer:** Created timestamp (text-label-sm, text-outline) + chevron_right button (text-slate-400)
- **Acceptance Criteria:**
  - Tap card → navigate sang Case Detail (view-detail)
  - Left border color phản ánh đúng trạng thái/priority
  - SLA countdown realtime (cập nhật mỗi phút)
  - Card có active:scale-[0.99] transition khi tap
  - Hiển thị tối đa 20 cards, lazy load thêm khi scroll

### FR-CS1.6: FAB (Floating Action Button)
- Position: fixed bottom-24 right-[calc(50%-215px+24px)]
- Style: w-14 h-14, bg-secondary-container, text-white, rounded-full, shadow-lg shadow-orange-300
- Icon: add (text-[28px])
- z-index: z-40
- **Acceptance Criteria:**
  - Tap → navigate sang Create Case (view-create)
  - Active:scale-90 transition khi tap
  - Không bị che bởi bottom nav
  - Chỉ hiển thị ở view-list

### FR-CS1.7: Bottom Navigation
- 5 tabs: Home, Cus360, Leads, Tasks, More
- More tab active (text-[#F37021], bg-[#F37021]/10, rounded-xl, icon filled)
- Links: dashboard.html, cus360.html, leads.html, tasks.html, More (toggleMoreMenu)
- **Acceptance Criteria:**
  - More tab highlighted vì Cases nằm trong More menu
  - Tap More → mở More Menu bottom sheet
  - Bottom nav chỉ hiển thị ở view-list

### FR-CS1.8: More Menu (Bottom Sheet)
- Overlay: fixed inset-0, bg-black/30, z-[80]
- Sheet: fixed bottom-0, w-[430px], bg-white, rounded-t-3xl, shadow-2xl, z-[85]
- Handle bar: w-10 h-1, bg-slate-300, rounded-full, mx-auto
- Title: "Thêm chức năng" (text-headline-sm, font-bold, text-primary)
- Grid 3 cols, gap-4:
  - Opportunities → opportunities.html (icon trending_up, bg-purple-100, text-primary)
  - Sales Support → sales-support.html (icon support_agent, bg-orange-100, text-secondary-container)
  - Cases (active): bg-purple-50, ring-2 ring-primary/20, icon folder_open filled, text-primary, font-bold
- **Acceptance Criteria:**
  - Cases item highlighted (active state) với ring + bg-purple-50
  - Tap overlay → close menu
  - Smooth slide-up animation

---

## FR-CS2: Màn hình Chi tiết Case (Case Detail)

### FR-CS2.1: Top AppBar
- Back button (arrow_back) → navigate về view-list
- Title "Case Management" (font-extrabold, text-lg, text-primary)
- Search icon button (search)
- **Acceptance Criteria:**
  - Back button quay về danh sách
  - Giữ scroll position khi quay lại list

### FR-CS2.2: Case ID Header
- Case ID: "CAS-00123" (text-headline-sm, font-bold, text-primary)
- SLA Badge: bg-orange-50, border border-orange-200, rounded-full, px-3 py-1
  - Icon timer (text-secondary, text-[16px])
  - Text "SLA: 1h 30p" (text-label-md, font-semibold, text-secondary)
- Status Chip: "Đang xử lý" (bg-purple-50, text-primary, rounded-full, px-3 py-1, text-label-md)
- Created timestamp: text-label-sm, text-outline (VD: "Tạo lúc 10:30 - 15/01/2025")
- **Acceptance Criteria:**
  - SLA badge countdown realtime
  - SLA badge đổi màu khi gần hết hạn (< 30p → bg-red-50, text-error)
  - Status chip phản ánh trạng thái hiện tại

### FR-CS2.3: Timeline Progress (3 Steps)
- Container: bg-white, rounded-xl, p-5, border border-slate-100, shadow-sm
- 3 steps horizontal: Mới → Đang xử lý → Đóng
- Active step: w-10 h-10, bg-primary, text-white, rounded-full, ring-4 ring-purple-100
- Completed step: bg-primary, text-white, icon check
- Future step: border-2 border-slate-200, bg-white
- Connector lines: h-[2px], bg-primary (completed) hoặc bg-slate-200 (future)
- **Acceptance Criteria:**
  - Visual rõ ràng step nào đang active
  - Ring-4 ring-purple-100 cho active step (glow effect)
  - Labels dưới mỗi step (text-label-sm)
  - Completed steps có checkmark icon

### FR-CS2.4: Customer Info Card
- Container: bg-white, rounded-xl, p-5, border border-slate-100, shadow-sm
- Layout: flex items-center gap-4
- Avatar: w-14 h-14 (56x56), rounded-xl, bg-purple-100, text-primary, font-bold, text-lg (initials)
- Customer info:
  - Name (text-headline-sm, font-bold, text-primary) — tap → navigate cus360.html
  - Tier badge: "Gold" (bg-yellow-100, text-yellow-700, text-[10px], font-extrabold, uppercase)
  - Phone (masked): "090 xxxx 567" (text-body-md, text-outline)
  - Email: "kh@email.com" (text-body-md, text-outline)
- Online status dot: w-3 h-3, bg-green-400, rounded-full, border-2 border-white, absolute
- **Acceptance Criteria:**
  - Tap tên KH → navigate sang cus360.html
  - Avatar fallback: initials từ tên KH
  - Phone masked cho bảo mật (chỉ hiện 3 số đầu + 3 số cuối)
  - Online dot chỉ hiện khi KH đang online

### FR-CS2.5: Case Content Card
- Container: bg-white, rounded-xl, p-5, border border-slate-100, shadow-sm
- Grid layout (2 cols) cho thông tin:
  - Loại yêu cầu: label (text-label-sm, text-outline, uppercase) + value (text-body-md, font-semibold)
  - Sản phẩm: label + value
  - Kênh tiếp nhận: label + value
  - Người xử lý: label + value (RM name)
- Mô tả section:
  - Label "Mô tả" (text-label-sm, text-outline, uppercase)
  - Content: bg-surface, p-4, rounded-lg, border-l-4 border-primary
  - Text: italic, text-body-md, text-on-surface, leading-relaxed
- **Acceptance Criteria:**
  - Thông tin đầy đủ từ CRM
  - Mô tả có quote style (italic + left border)
  - Responsive grid trong 430px width

### FR-CS2.6: Interaction History (Nhật ký xử lý)
- Section header: "Nhật ký xử lý" (text-headline-sm, font-bold) + "Ghi chú" button (text-primary, text-label-md, font-bold)
- Timeline layout:
  - Vertical line: absolute left-[11px], w-0.5, bg-slate-100
  - Dots: w-6 h-6, rounded-full, bg-[color]-100, text-[color]-600
  - Each item: relative pl-8
- Timeline items:
  - "Cập nhật trạng thái" — with quoted note from RM (bg-slate-50, p-3, rounded-lg, italic, text-body-md)
  - "Hệ thống tạo Case" — system event (text-label-sm, text-outline)
  - "Yêu cầu bổ sung chứng từ" — action item
- Each item shows: title (text-sm, font-bold) + timestamp (text-[10px], text-slate-400)
- **Acceptance Criteria:**
  - Timeline chronological (mới nhất trên cùng)
  - "Ghi chú" button → mở modal thêm ghi chú
  - Quoted notes hiển thị rõ ràng với bg khác biệt
  - System events vs manual events có visual khác nhau

### FR-CS2.7: Bottom Action Bar (3 Buttons)
- Container: fixed bottom-0, w-[430px], p-4 pb-8, bg-white/90, backdrop-blur-md, border-t, z-50, rounded-b-[40px]
- Layout: grid grid-cols-3 gap-3
- Button "Gọi điện": outlined (border border-primary, text-primary, rounded-xl, h-12, font-bold)
  - Icon: call
- Button "Nhắn tin": outlined (border border-primary, text-primary, rounded-xl, h-12, font-bold)
  - Icon: chat
- Button "Cập nhật Case": filled CTA (bg-secondary-container, text-white, rounded-xl, h-12, font-bold)
  - Icon: sync
- **Acceptance Criteria:**
  - "Gọi điện" → initiate call (hoặc toast "Đang kết nối...")
  - "Nhắn tin" → open messaging (hoặc toast)
  - "Cập nhật Case" → mở modal cập nhật trạng thái
  - All buttons: active:scale-95 transition
  - CTA button nổi bật nhất (orange bg)

---

## FR-CS3: Màn hình Tạo Case (Create Case)

### FR-CS3.1: Top AppBar
- Back button (arrow_back hoặc close) → navigate về view-list
- Title "Case Management" (font-extrabold, text-lg, text-primary)
- Search icon button
- **Acceptance Criteria:**
  - Back/Close → confirm dialog nếu form đã có data
  - Title consistent với các view khác

### FR-CS3.2: Progress Header
- Title: "Tạo mới yêu cầu" (text-headline-sm, font-bold, text-primary)
- Step indicator: "Bước 1/1" (text-label-md, text-outline)
- **Acceptance Criteria:**
  - Hiển thị rõ user đang ở bước nào
  - Single-step form (1/1)

### FR-CS3.3: Customer Selection (KHÁCH HÀNG)
- Section label: "KHÁCH HÀNG" (text-label-md, text-on-surface-variant, uppercase, tracking-wider)
- Search input:
  - Icon person_search (absolute left)
  - Placeholder: "Tìm khách hàng trong CRM..."
  - Style: h-12, rounded-xl, bg-white, border, pl-12
- Selected customer card (khi đã chọn):
  - bg-purple-50, rounded-xl, p-3, border border-primary/20
  - Avatar initials (w-10 h-10, rounded-full, bg-primary-container, text-white)
  - Customer name (font-bold)
  - CIF number (text-label-sm, text-outline)
  - Masked phone (text-body-md, text-on-surface-variant)
  - Close button (x icon) → deselect
- **Acceptance Criteria:**
  - Search autocomplete từ CRM database
  - Hiển thị dropdown suggestions khi typing
  - Tap suggestion → hiển thị selected card
  - Close button → clear selection, show search input lại
  - Required field — validate trước submit

### FR-CS3.4: Request Type (LOẠI YÊU CẦU)
- Section label: "LOẠI YÊU CẦU" (uppercase, tracking-wider)
- Select dropdown:
  - Options: Khiếu nại, Tư vấn, Sự cố kỹ thuật, Khóa thẻ khẩn cấp
  - Style: h-12, rounded-xl, bg-white, border, appearance-none
  - Chevron icon (expand_more) absolute right
- **Acceptance Criteria:**
  - Required field
  - Mỗi loại yêu cầu map với SLA khác nhau
  - "Khóa thẻ khẩn cấp" → auto set priority = High

### FR-CS3.5: Related Product (SẢN PHẨM LIÊN QUAN)
- Section label: "SẢN PHẨM LIÊN QUAN" (uppercase, tracking-wider)
- Select dropdown:
  - Options: Thẻ EVO, Vay tiêu dùng, TK thanh toán, Tiết kiệm Savy
  - Same style as Request Type select
- **Acceptance Criteria:**
  - Optional field
  - Products list từ CRM product catalog
  - Có thể chọn "Khác" hoặc để trống

### FR-CS3.6: Priority Level (MỨC ĐỘ ƯU TIÊN)
- Section label: "MỨC ĐỘ ƯU TIÊN" (uppercase, tracking-wider)
- 3 toggle buttons (flex, gap-2):
  - Low/Thấp: bg-white, border, text-on-surface-variant, rounded-xl, flex-1, h-12
  - Medium/Trung bình (selected): border-2 border-primary-container, bg-purple-50, text-primary, font-bold, rounded-xl, flex-1, h-12
  - High/Cao: bg-white, border, text-on-surface-variant, rounded-xl, flex-1, h-12
- **Acceptance Criteria:**
  - Chỉ 1 option selected tại 1 thời điểm
  - Default: Medium
  - Selected state: border-2 border-primary-container + bg-purple-50
  - Thay đổi priority → cập nhật SLA suggestion

### FR-CS3.7: Channel (KÊNH TIẾP NHẬN)
- Section label: "KÊNH TIẾP NHẬN" (uppercase, tracking-wider)
- Select dropdown:
  - Options: Hotline, Tại quầy, RM
  - Same select style
- **Acceptance Criteria:**
  - Required field
  - Default: RM (vì RM đang tạo case)

### FR-CS3.8: SLA Suggestion Card
- Container: bg-primary-container, rounded-xl, p-4, text-white
- Layout: flex justify-between items-center
- Left: Label "Gợi ý SLA" (text-label-sm, text-white/80) + Value "24 Giờ" (text-headline-md, font-bold, text-white)
- Right: "Dự kiến xong: 14:00 Mai" (text-label-md, text-white/80)
- **Acceptance Criteria:**
  - SLA tự động tính dựa trên Loại yêu cầu + Priority
  - Cập nhật realtime khi thay đổi type/priority
  - Hiển thị thời gian dự kiến hoàn thành
  - Card nổi bật (dark purple bg) để RM dễ nhận biết

### FR-CS3.9: Description (MÔ TẢ CHI TIẾT)
- Section label: "MÔ TẢ CHI TIẾT" (uppercase, tracking-wider)
- Textarea:
  - rows="4"
  - Placeholder: "Mô tả chi tiết yêu cầu của khách hàng..."
  - Style: w-full, rounded-xl, bg-white, border, p-4, resize-none
- **Acceptance Criteria:**
  - Optional nhưng recommended
  - Max 500 characters
  - Character count indicator khi > 400 chars

### FR-CS3.10: Attachments (ĐÍNH KÈM)
- Section label: "ĐÍNH KÈM" (uppercase, tracking-wider)
- Upload area:
  - Dashed border (border-2 border-dashed border-outline-variant)
  - Rounded-xl, p-6, text-center
  - Icon: add_a_photo (text-outline, text-[32px])
  - Text: "Chụp ảnh hoặc chọn file" (text-body-md, text-outline)
- Uploaded thumbnail:
  - w-20 h-20, rounded-xl, object-cover
  - Close button (absolute top-right, w-6 h-6, bg-error, text-white, rounded-full)
- Note: "Tối đa 5MB" (text-label-sm, text-outline)
- **Acceptance Criteria:**
  - Tap upload area → open camera/file picker
  - Preview thumbnail sau khi upload
  - Close button → remove attachment (confirm dialog)
  - Max file size: 5MB
  - Supported formats: JPG, PNG, PDF
  - Max 3 attachments

### FR-CS3.11: Submit Button & Note
- Button "Tạo Case":
  - w-full, h-14, bg-secondary-container, text-white, rounded-2xl, font-bold, text-headline-sm
  - Icon: task_alt
  - Shadow: shadow-lg shadow-orange-500/20
  - active:scale-[0.98] transition
- Note below button:
  - "Dữ liệu sẽ được đồng bộ ngay lập tức lên CRM Core" (text-label-sm, text-outline, text-center)
- **Acceptance Criteria:**
  - Validate required fields trước submit (Customer, Type, Channel)
  - Submit → Toast success "✓ Tạo Case thành công! Case mới đã được ghi nhận."
  - Navigate về view-list sau submit
  - Loading state trên button khi đang submit
  - Disable button khi form invalid

---

## FR-CS4: Toast Messages

### FR-CS4.1: Success Toasts
- "✓ Tạo Case thành công! Case mới đã được ghi nhận." — sau khi tạo case
- "✓ Cập nhật Case thành công!" — sau khi update status
- "✓ Ghi chú đã được thêm." — sau khi thêm note
- "✓ Check-in thành công!" — khi RM check-in xử lý

### FR-CS4.2: Error Toasts
- "Vui lòng chọn khách hàng!" — khi submit thiếu customer
- "Không thể tải dữ liệu. Vui lòng thử lại." — network error
- "File vượt quá 5MB. Vui lòng chọn file nhỏ hơn." — upload error

### FR-CS4.3: Warning Toasts
- "⚠️ Case sắp hết hạn SLA!" — SLA warning
- "Đã reset form." — khi reset form

---

## FR-CS5: Confirmation Dialogs

### FR-CS5.1: Update Status Dialog
- Title: "Cập nhật trạng thái Case?"
- Body: "Chuyển Case CAS-00123 sang trạng thái 'Đã xử lý'?"
- Actions: "Xác nhận" (bg-secondary-container, text-white) + "Hủy" (text-primary)

### FR-CS5.2: Delete/Close Case Dialog
- Title: "Đóng Case này?"
- Body: "Case sẽ được đánh dấu hoàn tất. Bạn có thể mở lại sau nếu cần."
- Actions: "Đóng Case" (bg-secondary-container) + "Hủy" (text-primary)

### FR-CS5.3: Discard Changes Dialog
- Title: "Hủy tạo Case?"
- Body: "Dữ liệu đã nhập sẽ không được lưu."
- Actions: "Hủy bỏ" (bg-error, text-white) + "Tiếp tục" (text-primary)

---

## FR-CS6: Edit Flow

### FR-CS6.1: Edit Case
- Từ Case Detail → More menu (more_vert) → "Chỉnh sửa"
- Navigate sang view-create với form pre-filled
- Title đổi thành "Chỉnh sửa Case"
- Submit button text: "Lưu thay đổi"
- **Acceptance Criteria:**
  - Form pre-populated với data hiện tại
  - Submit → Toast "✓ Cập nhật Case thành công!"
  - Navigate về view-detail sau save

---

## FR-CS7: Empty States

### FR-CS7.1: Empty Case List
- Icon: folder_open (text-[64px], text-slate-300)
- Title: "Chưa có Case nào" (text-headline-sm, text-slate-500)
- Subtitle: "Tạo Case mới để bắt đầu theo dõi yêu cầu khách hàng" (text-body-md, text-slate-400)
- CTA: "Tạo Case mới" button (bg-secondary-container, text-white, rounded-xl)

### FR-CS7.2: Empty Search Results
- Icon: search_off (text-[48px], text-slate-300)
- Text: "Không tìm thấy kết quả" (text-body-lg, text-slate-500)
- Subtitle: "Thử tìm với từ khóa khác" (text-body-md, text-slate-400)

### FR-CS7.3: Empty Interaction History
- Text: "Chưa có lịch sử xử lý" (text-body-md, text-slate-400, italic)

---

## FR-CS8: Cross-Navigation

### FR-CS8.1: Navigation Links
- Customer name (Detail) → cus360.html
- Bottom Nav Home → dashboard.html
- Bottom Nav Cus360 → cus360.html
- Bottom Nav Leads → leads.html
- Bottom Nav Tasks → tasks.html
- More Menu → Opportunities (opportunities.html), Sales Support (sales-support.html)
- **Acceptance Criteria:**
  - Tất cả links hoạt động đúng
  - Không có dead links (href="#")

---

## NFR: Non-Functional Requirements

### NFR-1: Performance
- First Contentful Paint < 1.5s
- Case list render < 500ms cho 20 items
- SLA countdown update mỗi 60s (không gây jank)
- Smooth scroll 60fps

### NFR-2: Accessibility
- Touch targets tối thiểu 44x44px
- Color contrast ratio ≥ 4.5:1 cho text
- Screen reader labels cho tất cả interactive elements
- Focus states visible cho keyboard navigation

### NFR-3: Offline Support
- Cache case list cho offline viewing
- Queue actions (create/update) khi offline
- Sync khi có network trở lại
- Toast thông báo trạng thái offline

### NFR-4: Security
- Phone numbers masked (chỉ hiện 3 đầu + 3 cuối)
- Session timeout sau 15 phút inactive
- Sensitive data không cache trên device
- API calls qua HTTPS only

### NFR-5: Device Compatibility
- Target: iPhone 17 Pro Max (430x932px)
- Safe area insets cho notch/dynamic island
- Bottom padding pb-6 cho home indicator
- Rounded corners 40px cho device frame

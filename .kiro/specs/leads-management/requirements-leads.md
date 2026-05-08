# Leads Management - Requirements Document

## Overview
Module quản lý Lead (KH tiềm năng) dành cho RM TPBank trên nền tảng mobile. Bao gồm 4 màn hình chính: Danh sách Lead, Chi tiết Lead, Tạo Lead mới, và Chuyển đổi Lead. Module hỗ trợ RM theo dõi, chăm sóc và chuyển đổi leads thành khách hàng hoặc cơ hội bán hàng.

**Target Device:** iPhone 17 Pro Max (430x932px)
**Design System:** Digital Banker (Manrope, Primary #390259, Secondary #FC7728)
**Navigation:** Link từ Bottom Nav "Leads" tab, link sang `cus360.html` và `dashboard.html`

---

## FR-L1: Màn hình Danh sách Lead (Lead List)

### FR-L1.1: Top AppBar
- Avatar RM (40x40, rounded-full) + Title "TPBank CRM"
- Search icon (navigate sang search mode)

### FR-L1.2: Search & Filter
- Search input: placeholder "Tìm kiếm tên Lead, SĐT..."
- Icon search bên trái input
- Filter chips (horizontal scrollable):
  - Trạng thái (active: primary-container background)
  - Sắp hết hạn
  - Ưu tiên
- **Acceptance Criteria:**
  - Search debounce 300ms
  - Filter chips toggle on/off
  - Kết hợp nhiều filter cùng lúc
  - Clear all filters option

### FR-L1.3: Metrics Overview
- Grid 2 cột:
  - "Lead mới hôm nay": số lượng (headline-md, primary)
  - "Tỷ lệ chuyển đổi": % (headline-md, secondary)
- **Acceptance Criteria:**
  - Dữ liệu realtime
  - Tap vào metric → drill-down chi tiết

### FR-L1.4: Lead Cards
- Header section: "Danh sách Lead" + count "X Leads"
- Mỗi lead card bao gồm:
  - **Avatar**: Initials (2 chữ cái đầu), background color theo priority
  - **Star icon** (top-right): Đánh dấu lead ưu tiên (filled yellow)
  - **Tên KH** (headline-sm) + Sản phẩm quan tâm (label-md) + SĐT (label-sm)
  - **Info grid** (3 cột, background surface-container-low):
    - Điểm lead: Số + icon bolt (primary nếu cao, variant nếu thấp)
    - Phân loại: Chip Hot (error) / Warm (secondary-fixed) / Cold (blue)
    - Ngày hết hạn: dd/mm/yyyy
  - **Status chip**: Đang chăm sóc (blue) / Mới (green) / Hết hạn (red)
  - **Quick actions** (bottom-right): Call, Email, Zalo buttons (rounded-full, surface-container-high)
- **Acceptance Criteria:**
  - Tap card → navigate sang Chi tiết Lead
  - Tap star → toggle ưu tiên
  - Tap Call → mở dialer
  - Tap Email → mở mail client
  - Infinite scroll hoặc pagination
  - Pull-to-refresh

### FR-L1.5: FAB - Tạo Lead mới
- Fixed bottom-right (bottom-24, right-6)
- Icon "add", background secondary-container
- Tap → navigate sang màn Tạo Lead mới

---

## FR-L2: Màn hình Chi tiết Lead (Lead Detail)

### FR-L2.1: Top AppBar
- Back button + Title "Chi tiết Lead"
- Share icon + More options (3-dot menu)

### FR-L2.2: Basic Info Card
- Avatar KH (64x64, rounded-2xl, border purple)
- Star icon (ưu tiên, top-right)
- Tên KH (headline-sm)
- Sản phẩm quan tâm (icon + text)
- SĐT (icon + text, masked)
- **Acceptance Criteria:**
  - Tap SĐT → mở dialer
  - Tap avatar → xem ảnh full

### FR-L2.3: Pipeline Status (Trạng thái Pipeline)
- Horizontal stepper (4 steps):
  - Mới → Đang chăm sóc → Từ chối → Hoàn thành
- Visual states:
  - Completed: Purple circle + check icon
  - Active: Solid purple circle + white dot
  - Upcoming: Gray circle + gray dot
- Progress line connecting steps
- "X% Hoàn thành" label (top-right)
- **Acceptance Criteria:**
  - RM có thể chuyển stage (tap vào step tiếp theo)
  - Ghi nhận timestamp khi chuyển stage
  - Không cho phép skip stage (phải tuần tự)

### FR-L2.4: AI Analysis Widget
- Card gradient background (tertiary-fixed to white)
- Header: icon auto_awesome + "Phân tích từ AI RM"
- Grid 2 cột:
  - Điểm Lead: X/100 (large number)
  - Phân loại: Hot/Warm/Cold
- AI Quote: Nhận xét ngắn về hành vi KH (italic)
- Best time to call: Khung giờ gợi ý
- AI Suggestion: Gợi ý hành động tiếp theo (icon lightbulb)
- **Acceptance Criteria:**
  - AI data cập nhật mỗi ngày
  - Tap suggestion → tạo task tự động
  - Confidence score cho mỗi gợi ý

### FR-L2.5: Lịch sử tương tác (Interaction History)
- Header: "Lịch sử tương tác" + "Xem tất cả"
- Timeline layout (vertical line + dots):
  - Mỗi item:
    - Dot color: Purple (active), Blue (follow-up), Gray (note)
    - Timestamp (label-sm, uppercase)
    - Status chip: Đã gọi (green) / Ghi chú (gray) / Follow-up (blue)
    - Title (body-md, bold)
    - Description (body-md, on-surface-variant)
- **Acceptance Criteria:**
  - Sắp xếp mới nhất trước
  - RM có thể thêm interaction mới
  - Filter theo loại (Call/Email/Note/Follow-up)
  - Hiển thị tối đa 5 items, "Xem tất cả" cho full list

### FR-L2.6: Bottom Action Bar
- Fixed bottom, 2 buttons:
  - "Chuyển đổi Lead" (flex-2, secondary-container, icon rocket_launch) → navigate sang Chuyển đổi
  - Edit button (w-14, purple-50, icon edit) → enable edit mode
- **Acceptance Criteria:**
  - Chuyển đổi chỉ available khi lead đủ điều kiện
  - Edit mở form inline hoặc navigate sang edit page

---

## FR-L3: Màn hình Tạo Lead Mới (Create Lead)

### FR-L3.1: Top AppBar
- Close button (X) + "Hủy" label (left)
- Title "Tạo Lead Mới" (center)
- Icon person_add (right)

### FR-L3.2: AI Prediction Banner
- Gradient card (primary to primary-container)
- Icon auto_awesome + label "Preview AI"
- "Dự báo điểm lead ban đầu: --" (chờ dữ liệu)
- Cập nhật realtime khi user điền form
- **Acceptance Criteria:**
  - Score preview update khi đủ 3+ fields
  - Hiển thị "--" khi chưa đủ data
  - Animation khi score thay đổi

### FR-L3.3: Form - Thông tin cơ bản
- Card trắng, rounded-2xl, border
- Fields:
  - Họ và tên (text, required) - icon person
  - Số điện thoại (tel, required) - icon call
  - Email (email, optional) - icon mail
  - Ngày sinh (date) - icon calendar_today
  - Giới tính (select: Nam/Nữ/Khác) - icon wc
  - Số định danh CMND/CCCD (text) - icon fingerprint
  - Nghề nghiệp (text) - icon work
  - Chức danh (text) - icon badge
- **Acceptance Criteria:**
  - Validate SĐT format (10 digits, starts with 0)
  - Validate email format
  - Required fields marked with *
  - Error messages inline dưới field

### FR-L3.4: Form - Sản phẩm & Nguồn
- Card trắng riêng
- Fields:
  - Sản phẩm quan tâm (select: Thẻ tín dụng/Vay mua nhà/Tiết kiệm/Bảo hiểm)
  - Nguồn lead (select: Website/Hotline/Giới thiệu)
- **Acceptance Criteria:**
  - Sản phẩm required
  - Nguồn lead required

### FR-L3.5: Form - Địa chỉ & Ghi chú
- Card trắng riêng
- Fields:
  - Địa chỉ (text) - icon location_on
  - Ghi chú (textarea, min-h 120px) - icon edit_note
- **Acceptance Criteria:**
  - Ghi chú max 500 ký tự
  - Character count hiển thị

### FR-L3.6: User Tip
- Info card (surface-container background)
- Icon info + text gợi ý: "Thông tin càng đầy đủ giúp AI dự báo điểm lead chính xác hơn"

### FR-L3.7: Bottom Action - Submit
- Fixed bottom, full-width button
- "Tạo Lead" + icon add_circle (primary background)
- **Acceptance Criteria:**
  - Disable khi required fields chưa đủ
  - Loading state khi submit
  - Success → navigate back to Lead List + toast
  - Error → hiển thị error message

---

## FR-L4: Màn hình Chuyển đổi Lead (Lead Conversion)

### FR-L4.1: Top AppBar
- Back button + Title "Chuyển đổi Lead"
- More options (3-dot)

### FR-L4.2: AI Conversion Suggestion
- Card trắng, border purple-100, shadow
- Badge "ĐỦ ĐIỀU KIỆN" (green, top-right) hoặc "CHƯA ĐỦ" (amber)
- Icon auto_awesome + "AI Gợi ý Chuyển đổi"
- Text gợi ý: Loại chuyển đổi + Sản phẩm cụ thể
- **Acceptance Criteria:**
  - AI evaluate dựa trên lead score + interaction history
  - Badge color: Green (≥80 score), Amber (60-79), Red (<60)

### FR-L4.3: Conversion Mode Selection
- Grid 2 cột:
  - Option 1: "Chuyển thành Khách hàng" (icon account_box)
  - Option 2: "Chuyển thành Cơ hội" (icon stars) — default selected
- Selected state: primary-container background, border-2 primary, radio filled
- Unselected: white background, border slate-100, radio empty
- **Acceptance Criteria:**
  - Single select (radio behavior)
  - Selection changes form fields below

### FR-L4.4: Conversion Form
- Card trắng
- Fields:
  - Tên khách hàng (read-only, pre-filled, gray background)
  - Sản phẩm (dropdown, pre-filled from AI suggestion)
  - Giá trị dự kiến - Opportunity Value (currency input, VND)
  - Ghi chú kết thúc (textarea)
- **Acceptance Criteria:**
  - Currency format auto (dots separator)
  - Sản phẩm dropdown có options từ catalog
  - Ghi chú optional

### FR-L4.5: Bottom Actions
- "Xác nhận Chuyển đổi" (full-width, orange/tpbank-orange, icon trending_flat)
- "Hủy" (text button, primary color)
- **Acceptance Criteria:**
  - Confirm → loading → success toast → navigate to Opportunity/Customer detail
  - Hủy → back to Lead Detail
  - Confirmation dialog trước khi submit (action không thể undo)

---

## FR-L5: Cross-Navigation

### FR-L5.1: Links
- Bottom Nav "Leads" tab → Lead List (`leads.html`)
- Bottom Nav "Home" → `dashboard.html`
- Bottom Nav "Cus360" → `cus360.html`
- Lead Card tap → Lead Detail (same page, different view)
- "Chuyển đổi Lead" → Conversion view
- FAB → Create Lead view
- Back buttons → previous screen

---

## FR-L6: Toast Messages & Notifications

### FR-L6.1: Success Messages
- **Tạo Lead thành công:**
  - Toast: "✓ Tạo lead thành công! Lead [Tên KH] đã được thêm vào danh sách."
  - Duration: 4s, auto-dismiss
  - Position: Top center (dưới AppBar)
  - Style: bg-green-100, text-green-800, icon check_circle
  - Action button: "Xem chi tiết" → navigate sang Lead Detail vừa tạo
- **Chuyển đổi thành công:**
  - Toast: "🚀 Chuyển đổi thành công! Lead [Tên KH] đã trở thành [Cơ hội/Khách hàng]."
  - Duration: 5s, auto-dismiss
  - Style: bg-purple-100, text-primary, icon rocket_launch
  - Action button: "Xem Cơ hội" hoặc "Xem KH" → navigate sang detail tương ứng
- **Cập nhật Lead thành công:**
  - Toast: "✓ Đã lưu thay đổi cho lead [Tên KH]."
  - Duration: 3s
  - Style: bg-green-100, text-green-800
- **Toggle ưu tiên:**
  - Toast: "⭐ Đã đánh dấu ưu tiên" hoặc "Đã bỏ đánh dấu ưu tiên"
  - Duration: 2s
- **Thêm tương tác thành công:**
  - Toast: "✓ Đã ghi nhận tương tác mới."
  - Duration: 3s

### FR-L6.2: Error Messages
- **Lỗi tạo Lead:**
  - Toast: "✗ Không thể tạo lead. Vui lòng thử lại."
  - Style: bg-error-container, text-error, icon error
  - Action button: "Thử lại"
  - Duration: Không auto-dismiss (user phải tap dismiss)
- **Lỗi chuyển đổi:**
  - Toast: "✗ Chuyển đổi thất bại. Vui lòng kiểm tra lại thông tin."
  - Style: bg-error-container, text-error
  - Action: "Thử lại"
- **Lỗi mạng:**
  - Toast: "⚠ Mất kết nối. Thao tác sẽ được thực hiện khi có mạng."
  - Style: bg-amber-100, text-amber-800, icon wifi_off
  - Duration: Persistent until online
- **Duplicate SĐT:**
  - Inline error dưới field SĐT: "Số điện thoại này đã tồn tại trong hệ thống."
  - Link: "Xem lead hiện có" → navigate sang lead trùng

### FR-L6.3: Warning Messages
- **Lead sắp hết hạn:**
  - Banner top (trong Lead Detail): "⚠ Lead này sẽ hết hạn trong X ngày."
  - Style: bg-amber-50, border-amber-200, text-amber-800
  - CTA: "Gia hạn" hoặc "Chuyển đổi ngay"
- **Lead đã hết hạn:**
  - Banner: "Lead này đã hết hạn vào [date]. Không thể thực hiện thao tác."
  - Style: bg-red-50, border-red-200, text-error
  - Actions bị disable (convert, edit)

---

## FR-L7: Bộ lọc Trạng thái (Status Filter Detail)

### FR-L7.1: Filter Chip "Trạng thái"
- Tap chip "Trạng thái" → mở Bottom Sheet với options:
  - ☐ Tất cả (default)
  - ☐ Mới (badge green)
  - ☐ Đang chăm sóc (badge blue)
  - ☐ Đã liên hệ (badge purple)
  - ☐ Chờ phản hồi (badge amber)
  - ☐ Hoàn thành (badge green-dark)
  - ☐ Từ chối (badge gray)
  - ☐ Hết hạn (badge red)
- Multi-select (checkbox behavior)
- Button "Áp dụng" (primary) + "Xoá bộ lọc" (text)
- **Acceptance Criteria:**
  - Chip hiển thị count khi có filter active: "Trạng thái (3)"
  - Chip background đổi sang primary-container khi active
  - Lead list filter realtime khi áp dụng
  - Count "X Leads" cập nhật theo filter
  - Persist filter khi navigate back từ detail

### FR-L7.2: Filter Chip "Sắp hết hạn"
- Toggle chip (on/off, không có bottom sheet)
- Khi active: Chỉ hiển thị leads hết hạn trong 7 ngày tới
- Active state: bg-error/10, text-error, border-error
- **Acceptance Criteria:**
  - Leads sắp hết hạn sorted by ngày hết hạn (gần nhất trước)
  - Badge count trên chip

### FR-L7.3: Filter Chip "Ưu tiên"
- Toggle chip (on/off)
- Khi active: Chỉ hiển thị leads có star (ưu tiên)
- Active state: bg-yellow-50, text-yellow-700, border-yellow-300
- **Acceptance Criteria:**
  - Chỉ hiện leads đã được star

### FR-L7.4: Sort Options
- Tap vào header "Danh sách Lead" → Bottom Sheet sort:
  - Điểm lead (cao → thấp) — default
  - Điểm lead (thấp → cao)
  - Ngày hết hạn (gần nhất)
  - Tên A-Z
  - Mới nhất trước
- **Acceptance Criteria:**
  - Sort indicator icon trên header
  - Persist sort preference

---

## FR-L8: Chỉnh sửa Lead (Edit Lead)

### FR-L8.1: Trigger
- Tap button "Edit" (icon edit) trên Lead Detail bottom bar
- Hoặc từ More menu (3-dot) → "Chỉnh sửa"

### FR-L8.2: Edit Mode UI
- Navigate sang màn hình Edit (tương tự Create nhưng pre-filled)
- AppBar: Back + "Chỉnh sửa Lead" + Save button (top-right)
- Tất cả fields editable (trừ Số định danh nếu đã verify)
- Highlight fields đã thay đổi (border-primary, subtle background)
- **Acceptance Criteria:**
  - Pre-fill tất cả data hiện tại
  - Unsaved changes warning khi tap Back: "Bạn có thay đổi chưa lưu. Bỏ thay đổi?"
  - Buttons: "Bỏ thay đổi" (destructive) / "Tiếp tục chỉnh sửa" (primary)

### FR-L8.3: Save Changes
- Button "Lưu thay đổi" (primary, full-width, fixed bottom)
- Loading state khi saving
- **Acceptance Criteria:**
  - Validate giống Create form
  - Success → Toast "Đã lưu thay đổi" → navigate back to Detail (updated)
  - Error → Toast error + stay on edit page
  - Audit log ghi nhận: field nào thay đổi, giá trị cũ/mới, timestamp, user

### FR-L8.4: Editable Fields
- Họ và tên, SĐT, Email, Ngày sinh, Giới tính
- Nghề nghiệp, Chức danh
- Sản phẩm quan tâm, Nguồn lead
- Địa chỉ, Ghi chú
- **Không editable:** Mã lead, Ngày tạo, RM phụ trách (chỉ admin đổi được)

---

## FR-L9: More Menu (3-dot Actions)

### FR-L9.1: Lead Detail More Menu
- Tap icon more_vert → Bottom Sheet:
  - 📝 Chỉnh sửa → FR-L8
  - 📋 Sao chép thông tin → Copy tên + SĐT to clipboard
  - 📤 Chia sẻ → Share sheet (native)
  - 🔄 Chuyển RM phụ trách → Form chọn RM mới (chỉ Manager)
  - 📌 Đánh dấu ưu tiên / Bỏ ưu tiên
  - 🗑️ Xoá Lead → Confirmation dialog
- **Acceptance Criteria:**
  - "Xoá Lead" yêu cầu confirm: "Bạn có chắc muốn xoá lead [Tên]? Thao tác này không thể hoàn tác."
  - Buttons: "Xoá" (error, destructive) / "Huỷ" (text)
  - Xoá thành công → Toast "Đã xoá lead" → navigate back to List
  - "Chuyển RM" chỉ hiện cho role Manager/Admin

### FR-L9.2: Lead List More Menu (per card)
- Long-press lead card → Context menu:
  - Xem chi tiết
  - Gọi điện
  - Gửi email
  - Đánh dấu ưu tiên
  - Xoá

---

## FR-L10: Thêm Tương tác mới (Add Interaction)

### FR-L10.1: Trigger
- Button "+" hoặc "Thêm ghi chú" trong section Lịch sử tương tác
- Hoặc sau khi thực hiện Call/Email → prompt "Ghi nhận tương tác?"

### FR-L10.2: Add Interaction Form (Bottom Sheet)
- Loại tương tác (required): Gọi điện / Email / Gặp mặt / Zalo / Ghi chú / Follow-up
- Tiêu đề (text, required): max 100 ký tự
- Nội dung (textarea, required): max 500 ký tự
- Kết quả: Thành công / Không nghe máy / Hẹn lại / Từ chối
- Ngày giờ: Auto-fill now, có thể chỉnh
- Đặt lịch follow-up: Toggle + Date picker (optional)
- **Acceptance Criteria:**
  - Submit → Toast success → Timeline cập nhật realtime
  - Nếu đặt follow-up → tạo Task tự động trong module Tasks
  - Cancel → dismiss bottom sheet, không mất data (draft 30s)

---

## FR-L11: Confirmation Dialogs

### FR-L11.1: Xác nhận Chuyển đổi Lead
- Trigger: Tap "Xác nhận Chuyển đổi" trên màn Convert
- Dialog center screen (modal overlay):
  - Icon: rocket_launch (primary, 48px)
  - Title: "Xác nhận chuyển đổi?"
  - Body: "Lead [Tên KH] sẽ được chuyển thành [Cơ hội/Khách hàng]. Thao tác này không thể hoàn tác."
  - Buttons: "Xác nhận" (primary filled) / "Huỷ" (text)
- **Acceptance Criteria:**
  - Modal có backdrop blur
  - Tap outside → dismiss (= Huỷ)
  - Xác nhận → loading on button → success flow

### FR-L11.2: Xác nhận Xoá Lead
- Dialog:
  - Icon: delete (error, 48px)
  - Title: "Xoá lead này?"
  - Body: "Lead [Tên KH] sẽ bị xoá vĩnh viễn. Tất cả lịch sử tương tác cũng sẽ bị mất."
  - Buttons: "Xoá" (error filled) / "Giữ lại" (text)

### FR-L11.3: Xác nhận Huỷ form (Unsaved Changes)
- Trigger: Tap Back/Close khi form có thay đổi chưa save
- Dialog:
  - Title: "Bỏ thay đổi?"
  - Body: "Bạn có thay đổi chưa được lưu. Bạn muốn bỏ thay đổi này?"
  - Buttons: "Bỏ thay đổi" (error text) / "Tiếp tục chỉnh sửa" (primary)

---

## FR-L12: Empty States & Edge Cases

### FR-L12.1: Empty Lead List
- Khi không có lead nào (hoặc filter trả về 0):
  - Illustration: Icon group_off (64px, slate-300)
  - Title: "Chưa có lead nào"
  - Subtitle: "Tạo lead mới hoặc thay đổi bộ lọc để xem kết quả."
  - CTA: "Tạo Lead mới" (primary button) → navigate sang Create

### FR-L12.2: Empty Interaction History
- Khi lead chưa có tương tác:
  - Icon: history (48px, slate-300)
  - Text: "Chưa có lịch sử tương tác"
  - CTA: "Thêm ghi chú đầu tiên" → open Add Interaction

### FR-L12.3: Search No Results
- Khi search không tìm thấy:
  - Icon: search_off (48px, slate-300)
  - Text: "Không tìm thấy lead nào cho '[keyword]'"
  - Suggestion: "Thử tìm với từ khoá khác hoặc xoá bộ lọc"

### FR-L12.4: Network Error
- Khi mất mạng lúc load list:
  - Icon: wifi_off (48px, slate-300)
  - Text: "Không có kết nối mạng"
  - CTA: "Thử lại" (primary outlined)
  - Hiển thị cached data nếu có (với banner "Dữ liệu offline")

---

## Non-Functional Requirements

### NFR-L1: Performance
- Lead list load < 2s (first 20 items)
- Search results < 500ms
- Form submission < 3s
- Smooth scroll 60fps
- Toast animation: 200ms slide-in, 200ms slide-out

### NFR-L2: Data Validation
- Client-side validation trước khi submit
- Server-side validation as backup
- Duplicate check (SĐT đã tồn tại)
- Real-time validation (highlight field ngay khi blur)

### NFR-L3: Offline
- Cached lead list viewable offline
- Create lead queued khi offline, sync khi online
- Indicator "Pending sync" cho queued items
- Offline badge trên AppBar khi mất mạng

### NFR-L4: Security
- SĐT masked trong list view (hiện đủ trong detail)
- Audit log cho mọi thao tác (create, convert, edit, delete)
- Role-based: Chỉ RM được assign mới thấy lead
- Soft delete: Lead xoá vẫn lưu 30 ngày trong trash (admin recover được)

### NFR-L5: Accessibility
- Touch targets ≥ 48x48px cho tất cả buttons
- Toast messages accessible via screen reader (role="alert")
- Form labels linked to inputs (for/id)
- Error messages announced by screen reader
- Color không phải indicator duy nhất (luôn kèm text/icon)

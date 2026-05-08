# Dashboard Home (RM) - Requirements Document

## Overview
Trang chủ Dashboard dành cho Relationship Manager (RM) của TPBank. Đây là màn hình đầu tiên khi RM mở ứng dụng CRM Mobile, cung cấp cái nhìn tổng quan về hiệu suất cá nhân, nhiệm vụ cần thực hiện, cơ hội bán hàng, và cảnh báo quan trọng.

**Target Device:** iPhone 17 Pro Max (430x932px)
**Design System:** Digital Banker (Manrope font, Brand Purple #390259, Accent Orange #FC7728)
**Navigation:** Link sang `cus360.html` từ Bottom Navigation (tab Cus360) và từ các card KH

---

## FR-D1: Top AppBar

### FR-D1.1: Header
- Fixed sticky top, z-index 50, background white, shadow-sm
- Logo TPBank (40x40px) + Title "Trang chủ" (headline-sm, primary)
- Notification bell icon với badge count (số thông báo chưa đọc)
- **Acceptance Criteria:**
  - Tap notification → mở dropdown/page danh sách thông báo
  - Badge ẩn khi count = 0
  - Logo tap → refresh trang

---

## FR-D2: Theo dõi KPI (KPI Tracking)

### FR-D2.1: KPI Progress Cards
- Grid 3 cột, mỗi card chứa:
  - Circular progress (SVG donut) với % hoàn thành
  - Label sản phẩm: Thẻ, Vay, Bảo hiểm
  - Color coding: Thẻ (primary #390259), Vay (secondary #a04100), Bảo hiểm (blue-500)
- **Acceptance Criteria:**
  - Progress animate khi load
  - Tap vào card → drill-down chi tiết KPI sản phẩm đó
  - Dữ liệu cập nhật realtime hoặc mỗi 15 phút

### FR-D2.2: AI KPI Prediction
- Card background primary-container (dark purple)
- Icon "auto_awesome" (filled) + nội dung dự báo AI
- Hiển thị % dự báo hoàn thành KPI tháng (bold, white)
- **Acceptance Criteria:**
  - AI prediction cập nhật hàng ngày
  - Nếu dự báo < 80% → hiển thị cảnh báo (amber)
  - Nếu dự báo > 100% → hiển thị congratulation (green accent)

---

## FR-D3: Phân bổ Cơ hội (Opportunity Allocation)

### FR-D3.1: Donut Chart - Tổng cơ hội
- Filter dropdown: "Hôm nay" / "Tháng này"
- Donut chart (SVG) hiển thị phân bổ theo trạng thái:
  - Chưa xử lý (primary)
  - Thu thập hồ sơ (secondary)
  - Phê duyệt (blue-400)
- Center text: Tổng số hồ sơ (headline-md, bold)
- Legend grid 3 cột bên dưới với count
- Badge "Tổng: X" ở header
- **Acceptance Criteria:**
  - Filter thay đổi → chart animate transition
  - Tap vào segment → filter danh sách theo trạng thái đó
  - Link "Xem danh sách cơ hội sắp đến hạn" → navigate sang danh sách

### FR-D3.2: Stacked Bar Chart - Hồ sơ theo sản phẩm
- Bar chart dọc, 4 cột sản phẩm: Vay mua nhà, Thẻ tín dụng, Tiết kiệm, Vay tiêu dùng
- Mỗi bar chia thành 4 segments (stacked):
  - Đã phê duyệt (blue-500)
  - Đang xử lý (primary)
  - Từ chối (error/70)
  - Bổ sung hồ sơ (surface-variant)
- Hiển thị % trong mỗi segment
- Tổng số hồ sơ trên đầu mỗi bar
- Legend 2x2 grid bên dưới
- **Acceptance Criteria:**
  - Bar height tỷ lệ với tổng số hồ sơ (responsive)
  - Tap vào segment → filter chi tiết
  - Tooltip khi long-press hiển thị số lượng cụ thể

---

## FR-D4: Nhiệm vụ hôm nay (Today's Tasks)

### FR-D4.1: Task List
- Header: "Nhiệm vụ hôm nay" + nút "Thêm mới"
- Mỗi task card:
  - Status icon circle (40x40):
    - Hoàn thành: green, icon check_circle (filled)
    - Chờ xử lý: orange (secondary-fixed), icon schedule (filled)
    - Quá hạn: red (error), icon error (filled)
  - Tiêu đề task (body-md, bold)
  - Tên KH liên quan (label-sm, on-surface-variant)
  - Status chip (Hoàn thành/Chờ xử lý/Quá hạn)
- **Acceptance Criteria:**
  - Sắp xếp: Quá hạn → Chờ xử lý → Hoàn thành
  - Tap task → mở chi tiết task (có thể navigate sang Cus360 của KH)
  - Nút "Thêm mới" → form tạo task nhanh
  - Swipe left → mark complete / dismiss
  - Hiển thị tối đa 5 tasks, có "Xem tất cả" nếu nhiều hơn

### FR-D4.2: Quick Add Task
- Bottom sheet hoặc modal khi tap "Thêm mới"
- Fields: Tiêu đề, Loại (Call/Email/Meeting/Follow-up), KH liên quan (search), Thời gian, Mức ưu tiên
- **Acceptance Criteria:**
  - Auto-suggest KH khi gõ tên
  - Validate: Tiêu đề required, Thời gian >= now

---

## FR-D5: Phân bổ KH tiềm năng (Lead Allocation)

### FR-D5.1: Lead Summary Donut
- Filter dropdown: "Hôm nay" / "Tháng này"
- Donut chart:
  - Mới (primary/30)
  - Hoàn thành (secondary-container)
- Center: Tổng leads (headline-md, bold) + label "LEADS"
- Sub-text: "Leads mới trong THÁNG"
- Legend: Mới: X / Hoàn thành: Y
- Link: "Xem DS KH tiềm năng sắp đến hạn"
- **Acceptance Criteria:**
  - Filter thay đổi → data + chart update
  - Link navigate sang tab Leads (hoặc page riêng)
  - Tap donut → drill-down danh sách leads

---

## FR-D6: KH theo phân khúc (Customer Segmentation)

### FR-D6.1: Segment Donut Chart
- Layout: Donut chart (128x128) bên trái + Legend bên phải
- Segments:
  - Mass (primary): count + %
  - Premier (secondary): count + %
  - Private (blue-500): count + %
- Center: Tổng KH (headline-sm, bold) + label "Tổng KH"
- **Acceptance Criteria:**
  - Tap segment → filter danh sách KH theo phân khúc
  - Dữ liệu cập nhật khi có KH mới được assign/remove
  - Hiển thị trend (tăng/giảm so với tháng trước) nếu có

---

## FR-D7: Cảnh báo KH rời bỏ (Churn Alert)

### FR-D7.1: Churn Risk List
- Header: "Cảnh báo KH rời bỏ" + count "(X khách hàng)" + "Xem tất cả"
- Mỗi alert card:
  - Warning icon circle (48x48, error-container background)
  - Tên KH (body-lg, bold)
  - Risk level chip: Cao (error/red) / Trung bình (amber) / Thấp (blue)
  - Mô tả lý do (body-md, on-surface-variant): VD "AUM giảm 40% trong 3 tháng qua"
  - CTA buttons: "Gọi CSKH" (primary filled) + "Đặt lịch hẹn" (primary outlined)
- Border: error-container/50 để highlight urgency
- **Acceptance Criteria:**
  - Sắp xếp theo risk level (Cao trước)
  - Tap tên KH → navigate sang `cus360.html` với profile KH đó
  - "Gọi CSKH" → mở dialer
  - "Đặt lịch hẹn" → mở form đặt lịch
  - Hiển thị tối đa 3 KH, "Xem tất cả" cho full list
  - AI-powered: Lý do churn được generate từ model

---

## FR-D8: Sự kiện hôm nay (Today's Events)

### FR-D8.1: Event List
- Header: "Sự kiện hôm nay" + "Thêm mới"
- Mỗi event card:
  - Icon circle (48x48) theo loại event:
    - Sinh nhật: cake (secondary, filled)
    - Đáo hạn sổ: savings (green)
    - Kỷ niệm: celebration (purple)
    - Hẹn gặp: event (blue)
  - Tiêu đề event (body-lg, bold)
  - Thời gian (label-sm, right-aligned)
  - Mô tả: Tên KH + Tier
  - CTA: "Gọi điện" / "Gửi SMS" / "Gửi email"
- **Acceptance Criteria:**
  - Events sắp xếp theo thời gian (sớm nhất trước)
  - Tap tên KH → navigate sang `cus360.html`
  - "Gọi điện" → mở dialer với SĐT KH
  - Auto-generate events từ data KH (sinh nhật, đáo hạn sổ tiết kiệm, etc.)
  - Nút "Thêm mới" → form tạo event/reminder

---

## FR-D9: Bottom Navigation

### FR-D9.1: Navigation Bar
- Fixed bottom, 5 tabs:
  - **Home** (active): icon home (filled), text orange #F37021
  - **Cus360**: icon assignment_ind → navigate sang `cus360.html`
  - **Leads**: icon leaderboard → navigate sang leads page
  - **Tasks**: icon task_alt → navigate sang tasks page
  - **More**: icon more_horiz → menu mở rộng
- **Acceptance Criteria:**
  - Active tab: Orange color + filled icon
  - Inactive: on-surface-variant + outlined icon
  - Tap Cus360 → open `cus360.html`
  - Safe area padding cho notch devices

---

## FR-D10: Cross-Navigation (Liên kết với Cus360)

### FR-D10.1: Navigate to Customer 360
- Từ Dashboard có thể navigate sang `cus360.html` qua:
  - Bottom nav tab "Cus360"
  - Tap tên KH trong Churn Alert → `cus360.html?id={customer_id}`
  - Tap tên KH trong Events → `cus360.html?id={customer_id}`
  - Tap tên KH trong Tasks → `cus360.html?id={customer_id}`
  - Tap vào segment KH → `cus360.html` với filter segment
- **Acceptance Criteria:**
  - Deep link truyền customer_id qua URL params
  - Cus360 page load đúng profile KH được chọn
  - Back button trên Cus360 → quay lại Dashboard

### FR-D10.2: Navigate back from Cus360
- Cus360 AppBar có nút Back (arrow_back)
- Tap Back → quay lại Dashboard (hoặc page trước đó)
- Bottom nav trên Cus360: Home tab → quay lại Dashboard

---

## FR-D11: Pull-to-Refresh & Loading States

### FR-D11.1: Refresh
- Pull-to-refresh gesture ở đầu trang
- Refresh tất cả data: KPI, Tasks, Leads, Churn alerts, Events
- **Acceptance Criteria:**
  - Loading spinner hiển thị khi đang refresh
  - Timeout 10s → hiển thị error toast
  - Skeleton loading cho lần load đầu tiên

### FR-D11.2: Empty States
- Mỗi section có empty state khi không có data:
  - Tasks: "Không có nhiệm vụ hôm nay 🎉"
  - Churn: "Không có cảnh báo KH rời bỏ"
  - Events: "Không có sự kiện hôm nay"
- **Acceptance Criteria:**
  - Empty state có illustration/icon + text mô tả
  - CTA phù hợp (VD: "Thêm nhiệm vụ mới")

---

## Non-Functional Requirements

### NFR-D1: Performance
- Dashboard load hoàn chỉnh < 3s trên 4G
- Chart render < 500ms
- Scroll smooth 60fps với nhiều sections
- Lazy load: Sections below fold load khi scroll đến

### NFR-D2: Data Freshness
- KPI data: Cache 15 phút, background refresh
- Tasks: Real-time sync (WebSocket hoặc polling 30s)
- Churn alerts: Cập nhật mỗi 6 giờ (batch AI processing)
- Events: Sync mỗi 5 phút

### NFR-D3: Offline Support
- Hiển thị cached data khi offline
- Badge "Offline" ở top khi mất kết nối
- Queue actions (mark task complete, etc.) để sync khi online

### NFR-D4: Accessibility
- Touch targets ≥ 48x48px
- Color contrast ≥ 4.5:1
- Charts có text alternatives (legend + numbers)
- Screen reader: Announce section titles khi scroll

### NFR-D5: Security
- Session check khi mở app
- Auto-logout sau 15 phút inactive
- Sensitive KH data masked trên Dashboard (chỉ hiện tên, không hiện SĐT/CCCD)

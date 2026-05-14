# Customer 360 Mobile - Requirements Document

## Overview
Ứng dụng Customer 360 Mobile là công cụ CRM dành cho nhân viên TPBank (Relationship Manager - RM), cung cấp cái nhìn toàn diện 360 độ về khách hàng trên nền tảng mobile. Ứng dụng hỗ trợ RM trong việc quản lý thông tin, theo dõi sản phẩm, phát triển cơ hội bán hàng và chăm sóc khách hàng hiệu quả.

**Target Device:** iPhone 17 Pro Max (430x932px)  
**Design System:** Digital Banker (Manrope font, Brand Purple #390259, Accent Orange #FC7728)

---

## FR-1: Shared Components (Thành phần dùng chung)

### FR-1.1: Top AppBar
- Hiển thị sticky ở đầu trang, z-index cao nhất
- Nút Back (arrow_back) để quay lại màn hình trước
- Title "Customer 360"
- Icon Search để tìm kiếm nhanh
- Icon Notifications với badge số lượng thông báo chưa đọc
- Avatar nhân viên đang đăng nhập (rounded, border primary)

### FR-1.2: Customer Profile Card
- Hiển thị ngay dưới AppBar trên mọi tab
- Avatar khách hàng (64x64px, rounded-xl) với online status indicator (green dot)
- Tên khách hàng (headline-sm, primary color)
- Status chips: Active/Inactive (green/red), Rating (Rất tốt/Tốt/Trung bình/Kém)
- Quick action buttons: Call, Email (rounded-full, surface-container background)
- Thông tin tóm tắt: Số CCCD/CMND, Địa chỉ (location)

### FR-1.3: Horizontal Tab Navigation
- Sticky dưới AppBar (top-16)
- Scrollable horizontal khi nhiều tab
- Tabs: Tổng quan, Thông tin KH, Sản phẩm, KH tiềm năng, Cơ hội bán, Cases, Relationships
- Active tab: border-bottom primary, text primary, font-bold
- Inactive tab: text on-surface-variant

### FR-1.4: Bottom Navigation Bar
- Fixed ở bottom, z-index 50
- 5 items: Home, Cus360 (active), Leads, Tasks, More
- Active state: Orange (#F37021) với background tint, icon filled
- Inactive state: Slate-400, icon outlined

### FR-1.5: Floating Action Button (FAB)
- Fixed bottom-right (bottom-24, right-4)
- Background: secondary-container (orange)
- Icon: "add" (white)
- Contextual action tùy theo tab đang active

---

## FR-2: Tab Tổng quan (Dashboard)

### FR-2.1: AI Insights & Summary
- Card với background primary-container (dark purple)
- Icon "auto_awesome" (filled) + title "AI Insights & Summary"
- Nội dung gợi ý AI dạng text (ví dụ: sản phẩm phù hợp, hành vi gần đây)
- KPI grid (2 cột):
  - Engagement Score (x/10)
  - Confidence (%)
- Next Best Action: icon lightbulb + tiêu đề + mô tả ngắn
- **Acceptance Criteria:**
  - AI insights được cập nhật realtime hoặc theo batch hàng ngày
  - Hiển thị confidence level cho mỗi gợi ý
  - RM có thể dismiss/acknowledge gợi ý

### FR-2.2: Nhiệm vụ hôm nay (Today's Tasks)
- Card trắng với border
- Header: Title + badge count (orange) + link "Lịch trình"
- Danh sách tasks dạng checkbox:
  - Checkbox (rounded, primary color khi checked)
  - Tiêu đề task (label-md, bold)
  - Thời gian + mức ưu tiên/loại (text 10px, on-surface-variant)
- **Acceptance Criteria:**
  - RM có thể check/uncheck task
  - Tasks được sắp xếp theo thời gian
  - Hiển thị tối đa 3-5 tasks, có link xem thêm

### FR-2.3: Life Events Timeline
- Header: Title + "Xem tất cả"
- Horizontal scrollable cards
- Mỗi event card (w-24):
  - Icon container (64x64, rounded-2xl, pastel background)
  - Label text (label-md, semibold)
- Các loại events: Sinh nhật, Mua nhà, Học tập, Du lịch, Kết hôn, Nghỉ hưu
- **Acceptance Criteria:**
  - Events được sắp xếp theo thời gian (sắp tới trước)
  - Tap vào event hiển thị chi tiết (ngày, ghi chú)
  - RM có thể thêm event mới

### FR-2.4: Biến động AUM (Asset Under Management)
- Card trắng với border
- Header: Title + dropdown filter (6 tháng / 1 năm)
- Area chart (SVG) hiển thị 3 layers: CASA, Tiền gửi (TD), Bond & MF
- Legend grid (3 cột): CASA, Tiền gửi, Bond & MF với số liệu
- Footer: Tổng tài sản (headline-sm, primary) + Tăng trưởng (% với icon trending_up/down)
- **Acceptance Criteria:**
  - Chart responsive theo width container
  - Số liệu format theo VND (M = triệu, B = tỷ)
  - Tăng trưởng hiển thị màu xanh (tăng) hoặc đỏ (giảm)

### FR-2.5: Gợi ý bán (Next Best Action - NBA)
- Header: Title + "Tất cả"
- Grid 4 items ngang (flex justify-between)
- Mỗi item: Icon circle (56x56) + label
- Các loại: TD (Tiền gửi), Card (Thẻ), UPL (Vay tín chấp), Banca (Bảo hiểm)
- **Acceptance Criteria:**
  - Tap vào item mở chi tiết sản phẩm gợi ý
  - NBA được tính toán dựa trên profile và hành vi KH
  - Hiển thị tối đa 4-6 items

### FR-2.6: Báo cáo Nợ của Khách hàng
- Collapsible card (expand/collapse)
- Summary grid (2 cột): Tổng dư nợ, Hạn mức còn lại
- Breakdown theo loại nợ:
  - Tên loại nợ + dot color indicator
  - Số tiền (formatted)
  - Progress bar (% so với tổng)
- **Acceptance Criteria:**
  - Hiển thị tất cả khoản nợ active
  - Progress bar tỷ lệ chính xác
  - Có thể expand/collapse section

### FR-2.7: Rủi ro & Tuân thủ (Risk & Compliance)
- Card trắng
- Grid 2 cột:
  - AML Rank: icon shield + label + giá trị (LOW/MEDIUM/HIGH) với color coding
  - Credit Score: icon bar_chart + label + giá trị số
- Profile Status checklist:
  - Check items: Đầy đủ hồ sơ pháp lý, Hợp đồng hiệu lực, KYC cập nhật
  - Icon check_circle (green) hoặc warning (amber)
- **Acceptance Criteria:**
  - Color coding: LOW=green, MEDIUM=amber, HIGH=red
  - Credit Score range: 300-850
  - Cảnh báo nếu có item chưa hoàn thành

### FR-2.8: Hoạt động gần đây (Recent Activities)
- Timeline layout với vertical line connector
- Grouped by time: "Hôm nay", "Tuần trước", "Tháng trước"
- Mỗi activity item:
  - Circle icon (32x32, colored background theo loại)
  - Card content: Tiêu đề, thời gian, mô tả, số tiền (nếu có), status chip
- Loại activities: Giao dịch, Liên hệ hỗ trợ, Gửi tiết kiệm, Mở sản phẩm mới
- **Acceptance Criteria:**
  - Infinite scroll hoặc pagination
  - Filter theo loại activity
  - Hiển thị tối thiểu 10 items gần nhất

---

## FR-3: Tab Thông tin KH (Customer Information)

### FR-3.1: Thông tin cơ bản
- Card với header (surface-container-low background)
- Danh sách key-value pairs (dashed border separator):
  - Loại giấy tờ tùy thân (CCCD/CMND/Passport)
  - Số định danh (với nút copy)
  - Ngày cấp, Nơi cấp, Ngày hết hạn
  - Ngày sinh, Trình độ học vấn
  - Tình trạng hôn nhân, Quốc tịch, Giới tính
- **Acceptance Criteria:**
  - Ngày hết hạn highlight orange nếu sắp hết hạn (<6 tháng)
  - Nút copy hoạt động (clipboard API)
  - Dữ liệu masked cho sensitive fields (có thể toggle hiển thị)

### FR-3.2: Priority Member Banner
- Full-width banner (h-32, rounded-xl)
- Gradient background (primary colors)
- Title: Tier name (Priority/Platinum/Gold)
- Subtitle: "Exclusive Banking Benefits"
- Icon decorative (workspace_premium)

### FR-3.3: Thông tin liên hệ
- Card với header
- Mỗi item: Icon circle (40x40) + label + value
- Fields: SĐT di động, SĐT nhà, Email, Địa chỉ thường trú, Địa chỉ tạm trú
- **Acceptance Criteria:**
  - Tap SĐT → mở dialer
  - Tap Email → mở mail client
  - Tap Địa chỉ → mở maps

### FR-3.4: Thông tin nghề nghiệp
- Card với header
- Fields: Đơn vị công tác, Nghề nghiệp, Chức vụ, Thu nhập (range)
- **Acceptance Criteria:**
  - Thu nhập hiển thị dạng range hoặc masked

---

## FR-4: Tab Sản phẩm (Products)

### FR-4.1: Danh sách Thẻ (Cards)
- Section header: "Thẻ (count)" + "Xem tất cả"
- Mỗi card item:
  - Icon (credit_card/payments, 48x48)
  - Tên thẻ (Visa Signature, Napas Debit, etc.)
  - Số thẻ masked (4562 12** **** 8899)
  - Status chip (Hoạt động/Khóa/Hết hạn)
  - Chi tiết: Hạn mức, Dư nợ hiện tại
- **Acceptance Criteria:**
  - Số thẻ luôn masked, không hiển thị đầy đủ
  - Color coding cho status
  - Tap vào card mở chi tiết giao dịch thẻ

### FR-4.2: Tài khoản thanh toán (Current Accounts)
- Section header: "Tài khoản thanh toán (count)"
- Mỗi account:
  - Icon (account_balance_wallet)
  - Tên TK + Số TK (với nút copy)
  - Ngày mở, Trạng thái
  - Số dư khả dụng (headline-sm, bold, primary)
- **Acceptance Criteria:**
  - Số dư format theo VND
  - Nút copy số TK
  - Tap mở lịch sử giao dịch

### FR-4.3: Khoản vay (Loans)
- Section header: "Khoản vay (count)"
- Mỗi loan:
  - Icon (real_estate_agent/directions_car)
  - Tên khoản vay + Mã hợp đồng
  - Status chip (Đang trả nợ/Quá hạn/Đã tất toán)
  - Grid chi tiết: Số tiền vay, Dư nợ gốc, Kỳ tiếp theo, Số tiền kỳ này
- **Acceptance Criteria:**
  - Highlight khoản vay quá hạn (error color)
  - Hiển thị ngày thanh toán kỳ tiếp theo
  - Tap mở lịch sử thanh toán

### FR-4.4: Tiền gửi tiết kiệm (Deposits)
- Section header: "Tiền gửi (count)"
- Mỗi deposit:
  - Kỳ hạn, Lãi suất, Ngày đáo hạn
  - Số tiền gửi, Lãi dự kiến
- **Acceptance Criteria:**
  - Highlight sắp đáo hạn (<30 ngày)
  - Hiển thị lãi suất hiện tại

---

## FR-5: Tab KH tiềm năng (Leads)

### FR-5.1: Danh sách Leads
- Header: "Danh sách Leads (count)"
- Mỗi lead card:
  - Icon theo loại sản phẩm (savings/directions_car/credit_card)
  - Tên sản phẩm quan tâm
  - Label "Sản phẩm quan tâm"
  - **Lead Score** (circular progress SVG, 0-100)
  - Grid chi tiết:
    - Ngày hết hạn lead
    - Đánh giá lead: Hot (red) / Warm (orange) / Cold (blue)
    - Nguồn khách hàng (Campaign, Web, Referral, etc.)
- **Acceptance Criteria:**
  - Lead Score visual: circle progress với số ở giữa
  - Sắp xếp theo Lead Score giảm dần (mặc định)
  - Filter theo đánh giá (Hot/Warm/Cold)
  - Tap mở chi tiết lead với lịch sử tương tác
  - Cảnh báo lead sắp hết hạn (<7 ngày)

### FR-5.2: Tạo Lead mới (via FAB)
- Form tạo lead: Sản phẩm, Nguồn, Ghi chú
- Auto-assign cho RM hiện tại
- **Acceptance Criteria:**
  - Validate required fields
  - Tự động tính Lead Score ban đầu

---

## FR-6: Tab Cơ hội bán (Sales Opportunities)

### FR-6.1: Danh sách Cơ hội bán
- Header: "Danh sách cơ hội bán"
- Mỗi opportunity card:
  - Icon theo loại (savings/directions_car/credit_card)
  - Tên cơ hội (Mở mới thẻ tín dụng, Mở mới khoản vay)
  - SĐT khách hàng
  - **Win Rate** (circular progress, 0-100%)
  - Grid chi tiết:
    - Sản phẩm cụ thể (Visa Signature, Vay mua ô tô)
    - Trạng thái: Thu thập hồ sơ (orange) / Đang xử lý / Hoàn thành (blue)
    - Ngày đóng (nếu đã đóng)
- **Acceptance Criteria:**
  - Win Rate tính toán dựa trên pipeline stage
  - Filter theo trạng thái
  - Sắp xếp theo Win Rate hoặc ngày tạo
  - Tap mở chi tiết với timeline xử lý

### FR-6.2: Pipeline Stages
- Stages: Tiếp cận → Thu thập hồ sơ → Thẩm định → Phê duyệt → Hoàn thành
- Mỗi stage có color coding riêng
- **Acceptance Criteria:**
  - RM có thể chuyển stage
  - Ghi nhận thời gian ở mỗi stage
  - Notification khi opportunity stuck quá lâu

---

## FR-7: Tab Cases (Yêu cầu/Khiếu nại)

### FR-7.1: Danh sách Cases
- Header: "Danh sách Cases (count)"
- Mỗi case card:
  - Icon theo loại (work/credit_card/support)
  - Tiêu đề case + Mã case (C-2024-001)
  - Grid chi tiết (2 cột):
    - Tên người liên hệ
    - Chủ đề
    - Mức ưu tiên: CAO (red) / TRUNG BÌNH (blue) / THẤP (green)
    - Trạng thái: ĐANG XỬ LÝ (amber) / HOÀN THÀNH (green) / ĐÃ ĐÓNG (gray)
    - Ngày mở / Ngày đóng
    - Kênh tiếp nhận (App/Tại quầy/Hotline) + icon
    - Người xử lý
- **Acceptance Criteria:**
  - Sắp xếp: Ưu tiên cao trước, sau đó theo ngày mở
  - Filter theo trạng thái, mức ưu tiên
  - Tap mở chi tiết case với conversation history
  - RM có thể cập nhật trạng thái case

### FR-7.2: Tạo Case mới (via FAB)
- Form: Chủ đề, Mô tả, Mức ưu tiên, Kênh tiếp nhận
- Auto-fill: Tên KH, Mã KH, RM phụ trách
- **Acceptance Criteria:**
  - Validate required fields
  - Tự động gán mã case
  - Notification cho người xử lý

---

## FR-8: Tab Relationships (Mối quan hệ)

### FR-8.1: Customer Relationship Visualization
- Header: "Customer Relationship" + toggle "Show fields on cards" + zoom controls
- Graph visualization:
  - Root node: Khách hàng chính (border primary, icon account_circle)
  - Connecting lines (vertical/horizontal)
  - Group header: "Members" với badge count
- **Acceptance Criteria:**
  - Zoom in/out/reset controls hoạt động
  - Toggle fields ẩn/hiện chi tiết trên cards
  - Responsive layout cho mobile

### FR-8.2: Member Cards
- Mỗi member card:
  - Tên (headline, primary color)
  - Expand/collapse (keyboard_arrow_down)
  - Chi tiết (key-value pairs):
    - Tên Tài Khoản
    - Quan hệ (Con/Chồng/Vợ/Cha/Mẹ/Anh chị em)
    - Tuổi
    - Sản phẩm đang dùng (nếu là KH TPBank)
- **Acceptance Criteria:**
  - Tap member mở profile 360 của họ (nếu là KH TPBank)
  - RM có thể thêm/sửa/xoá relationship
  - Hiển thị cross-selling opportunity dựa trên household

---

## FR-9: Search & Navigation

### FR-9.1: Tìm kiếm khách hàng
- Search bar trong AppBar
- Tìm theo: Tên, SĐT, Số CCCD, Số TK
- Kết quả hiển thị dạng list với avatar + tên + SĐT
- **Acceptance Criteria:**
  - Search debounce 300ms
  - Hiển thị recent searches
  - Minimum 2 ký tự để trigger search

### FR-9.2: Deep Linking giữa các tab
- Từ Dashboard tap NBA item → chuyển sang tab Sản phẩm tương ứng
- Từ Leads tap → mở chi tiết lead
- Từ Relationships tap member → mở Customer 360 của member đó

---

## FR-10: Notifications & Alerts

### FR-10.1: Push Notifications
- Task reminders (trước 15 phút)
- Lead sắp hết hạn
- Case mới được assign
- Khoản vay quá hạn thanh toán

### FR-10.2: In-app Alerts
- Badge count trên icon notifications
- Dropdown list notifications khi tap
- Mark as read/unread

---

## Non-Functional Requirements

### NFR-1: Performance
- First Contentful Paint < 2s trên 4G
- Tab switching < 300ms
- Scroll smooth 60fps
- Offline-first: cache dữ liệu KH đã xem

### NFR-2: Security
- Session timeout sau 15 phút inactive
- Sensitive data masked by default (số thẻ, CCCD)
- Biometric authentication support (FaceID/TouchID)
- Audit log cho mọi thao tác của RM

### NFR-3: Accessibility
- Minimum touch target 48x48px
- Color contrast ratio ≥ 4.5:1
- Screen reader compatible
- Font size scalable

### NFR-4: Responsive
- Primary target: 430x932px (iPhone 17 Pro Max)
- Support range: 375px - 430px width
- Bottom safe area padding cho notch devices

### NFR-5: Data Sync
- Real-time sync cho tasks và notifications
- Background sync cho profile data (mỗi 5 phút)
- Conflict resolution: server wins

# Sales Support - Requirements Document

## Overview
Module Hỗ trợ Bán hàng (Sales Support / Customer Insights) dành cho RM TPBank trên mobile. Bao gồm 4 màn hình: Customer Insights Hub, AI Sales Script (Kịch bản bán), AI Smart Scripts (Tình huống), và Product Handbook (Cẩm nang sản phẩm). Module giúp RM nhận gợi ý AI về kịch bản tư vấn, xử lý tình huống bán hàng theo ngữ cảnh, và tra cứu thông tin sản phẩm nhanh chóng trong quá trình tư vấn khách hàng.

**Target Device:** iPhone 17 Pro Max (430x932px)
**Design System:** Digital Banker (Manrope, Primary #390259, CTA Orange #FC7728)
**Navigation:** Link từ Bottom Nav "More" menu → Sales Support, link sang `dashboard.html`, `cus360.html`, `leads.html`, `tasks.html`

---

## FR-SS1: Màn hình Customer Insights (Main Hub)

### FR-SS1.1: Top AppBar
- Back button (arrow_back, rounded-full, hover:bg-slate-50) → navigate back
- Title "Customer Insights" (font-extrabold, text-lg, text-primary)
- RM Avatar (right-aligned, 32x32, rounded-full, ring-2 ring-primary-fixed, bg-primary-container)
- **Acceptance Criteria:**
  - Back button navigate về trang trước hoặc dashboard
  - Avatar hiển thị ảnh RM hoặc initials

### FR-SS1.2: Customer Profile Card
- Avatar khách hàng (64x64, rounded-full, ring-2 ring-secondary-container)
- Tên khách hàng (headline-sm, font-bold, text-on-surface): VD "Chị Đặng Khánh Vy"
- Tier badge: "GOLD" (bg-yellow-100, text-yellow-700, text-[10px], font-extrabold, uppercase)
- Tags (horizontal, gap-2):
  - "Ưu tiên" (bg-error-container, text-error, rounded-full, text-label-sm)
  - "Vay mua nhà" (bg-blue-100, text-blue-700, rounded-full, text-label-sm)
- **Acceptance Criteria:**
  - Tap tên KH → navigate sang `cus360.html`
  - Tags hiển thị từ CRM profile
  - Avatar fallback: initials nếu không có ảnh

### FR-SS1.3: Status Banner (Consultation Active)
- Background: bg-primary-container, rounded-xl, p-4
- Text: "Đang tư vấn trực tiếp" (text-white, font-semibold)
- Live pulse dot (w-2 h-2, bg-green-400, rounded-full, animate-pulse) bên trái text
- Countdown Timer: "15:00" (text-white, font-bold, text-headline-sm) — đếm ngược
- **Acceptance Criteria:**
  - Timer đếm ngược realtime (mm:ss format)
  - Pulse dot animation liên tục khi đang tư vấn
  - Khi hết giờ → Toast warning "⏰ Thời gian tư vấn đã hết!"
  - Banner chỉ hiện khi RM đang trong session tư vấn active

### FR-SS1.4: Main Action Cards (Vertical Stack)
- 3 cards xếp dọc (space-y-3), mỗi card:
  - Rounded-xl, p-4, flex items-center gap-3, cursor-pointer, active:scale-[0.99]
  - Icon (40x40, rounded-xl, flex items-center justify-center)
  - Title (body-lg, font-bold, text-on-surface)
  - Chevron right (material icon, text-slate-400, ml-auto)

- **Card 1: "AI Gợi ý kịch bản bán"**
  - Icon: auto_awesome (filled)
  - Icon background: gradient purple-to-orange (ai-glow effect), text-white
  - Tap → navigate sang view-script (FR-SS2)

- **Card 2: "AI Đề xuất theo tình huống"**
  - Icon: psychology_alt
  - Icon background: bg-orange-100, text-secondary-container
  - Tap → navigate sang view-situation (FR-SS3)

- **Card 3: "Cẩm nang sản phẩm"**
  - Icon: menu_book
  - Icon background: bg-surface-container, text-primary
  - Tap → navigate sang view-products (FR-SS4)

- **Acceptance Criteria:**
  - Mỗi card có hover/active state rõ ràng
  - Transition smooth khi navigate
  - Card 1 có visual emphasis (gradient glow) vì là AI feature chính

### FR-SS1.5: Products of Interest
- Section header: "Sản phẩm KH quan tâm" (label-md, text-on-surface-variant, uppercase tracking-wider)
- List items (space-y-2):
  - "Thẻ Platinum Visa" — icon check_circle (filled, text-green-600) + text (body-md, font-medium)
  - "Gói vay HomeLoan" — icon check_circle (filled, text-green-600) + text (body-md, font-medium)
- Card container: bg-white, rounded-xl, p-4, border border-slate-100, shadow-sm
- **Acceptance Criteria:**
  - Danh sách lấy từ CRM profile KH
  - Tap sản phẩm → navigate sang Product Handbook filtered theo sản phẩm đó
  - Maximum 5 items hiển thị, "Xem thêm" nếu > 5

### FR-SS1.6: Bottom Navigation
- 5 tabs: Home, Cus360, Leads, Tasks, More
- "More" tab active (text-[#F37021], bg-[#F37021]/10, rounded-xl, icon filled)
- Links: Home→dashboard.html, Cus360→cus360.html, Leads→leads.html, Tasks→tasks.html
- More → toggleMoreMenu() với Sales Support highlighted/active
- **Acceptance Criteria:**
  - More menu hiện Sales Support với ring-2 ring-primary/20, bg-purple-50, font-bold text-primary
  - Các module khác (Opportunities, Cases) link bình thường

---

## FR-SS2: Màn hình AI Sales Script (Kịch bản bán)

### FR-SS2.1: Top AppBar
- Back button → navigate về view-hub
- Title "Customer Insights" (text-primary, font-bold)
- RM badge (right): small avatar hoặc initials badge

### FR-SS2.2: AI Recommendation Header
- Icon auto_awesome (filled, text-secondary-container) + Label "AI RECOMMENDATION" (text-label-sm, uppercase, tracking-wider, text-on-surface-variant)
- Subtitle: "Kịch bản tư vấn Thẻ Platinum Visa" (headline-sm, font-bold, text-primary)
- **Acceptance Criteria:**
  - Title dynamic theo sản phẩm đang tư vấn
  - AI badge visual (gradient hoặc glow effect)

### FR-SS2.3: Customer Profile Summary
- Compact card (bg-white, rounded-xl, p-4, border):
  - Avatar (40x40, rounded-full) + Tên KH (body-lg, font-bold) + Tuổi (body-md, text-slate-500)
  - Badge "Tiềm năng cao" (bg-green-100, text-green-700, rounded-full, text-label-sm)
  - Info row: "Thu nhập: 50tr/tháng" (icon payments) + "Sở thích: Thích du lịch" (icon flight)
- **Acceptance Criteria:**
  - Data từ CRM profile
  - Badge color theo scoring: Cao (green), Trung bình (amber), Thấp (slate)

### FR-SS2.4: Main Script Card
- Premium card styling:
  - Background: gradient glass-purple (bg-gradient-to-br from-purple-50 to-purple-100/50)
  - Border: border-2 border-primary/10
  - Rounded-2xl, p-5
- Content:
  - Bullet points với orange dots (w-2 h-2, bg-secondary-container, rounded-full)
  - Script text (body-md, text-on-surface, leading-relaxed)
  - Bold highlights trong text: "hoàn tiền 10%" (font-bold, text-primary), "bảo hiểm du lịch" (font-bold, text-primary), "phong cách sống" (font-bold, text-primary)
- Key Benefits chips (horizontal scroll, gap-2):
  - "Hoàn tiền cao" (bg-green-100, text-green-700, rounded-full, px-3 py-1)
  - "Phòng chờ VIP" (bg-blue-100, text-blue-700, rounded-full, px-3 py-1)
  - "Bảo hiểm du lịch" (bg-orange-100, text-orange-700, rounded-full, px-3 py-1)
- **Acceptance Criteria:**
  - Script content generated by AI dựa trên profile KH
  - Benefits chips clickable → expand detail
  - Script text selectable (long-press to copy)

### FR-SS2.5: Action Buttons
- **"Sao chép"** (Primary CTA):
  - Full-width, h-12, bg-secondary-container, text-white, rounded-xl, font-bold
  - Icon content_copy (left)
  - Tap → copy script to clipboard → Toast "✓ Đã sao chép kịch bản!"

- **"Điều chỉnh kịch bản"** (Secondary):
  - Full-width, h-12, border-2 border-primary, text-primary, rounded-xl, font-bold
  - Icon edit_note (left)
  - Tap → open edit mode (textarea pre-filled with script)

- **"Đổi tình huống"** (Text link):
  - Text-center, text-primary, font-semibold, py-3
  - Icon refresh (left, text-[18px])
  - Tap → regenerate script với context khác

- **Acceptance Criteria:**
  - Copy button: clipboard API, fallback toast nếu fail
  - Edit mode: inline textarea, Save/Cancel buttons
  - Regenerate: loading spinner 1-2s → new script content
  - Buttons stack vertically (space-y-3)

---

## FR-SS3: Màn hình AI Smart Scripts (Tình huống)

### FR-SS3.1: Top AppBar
- Back button → navigate về view-hub
- Title "Customer Insights" (text-primary, font-bold)
- RM Avatar (right, 32x32)

### FR-SS3.2: Section Header
- "AI Smart Scripts" (headline-sm, font-bold, text-primary)
- Icon auto_awesome (filled, text-secondary-container) bên trái title
- Subtitle: "Gợi ý xử lý tình huống bán hàng" (body-md, text-on-surface-variant)

### FR-SS3.3: Situation Chips (Horizontal Scroll)
- Container: overflow-x-auto, no-scrollbar, flex gap-2, pb-2
- Chips:
  - **Active:** "Khách do dự về lãi suất" (bg-primary-container, text-white, rounded-full, px-4 py-2, font-bold, shadow-sm)
  - Inactive: "So sánh lãi suất" (bg-white, border border-outline-variant, text-on-surface-variant, rounded-full, px-4 py-2)
  - Inactive: "Phí thường niên"
  - Inactive: "Cần quyết nhanh"
- **Acceptance Criteria:**
  - Single select (radio behavior)
  - Tap chip → update chat/script content below
  - Smooth horizontal scroll
  - Active chip: visual emphasis rõ ràng

### FR-SS3.4: Context Banner
- Compact banner (bg-surface-container-low, rounded-xl, p-3, flex items-center gap-3):
  - Avatar KH (32x32, rounded-full)
  - Text: "Đang tư vấn cho Chị Vy - Khách hàng Priority" (body-md, font-medium)
- **Acceptance Criteria:**
  - Banner sticky below chips
  - Hiển thị context KH đang tư vấn

### FR-SS3.5: Chat Interface
- Container: space-y-3, px-4, py-4
- **RM message** (right-aligned):
  - Container: ml-auto, max-w-[80%]
  - Bubble: bg-primary, text-white, rounded-t-2xl rounded-bl-2xl, px-4 py-3
  - Text: body-md, leading-relaxed
  - Timestamp: text-[10px], text-white/60, mt-1, text-right

- **Customer message** (left-aligned):
  - Container: mr-auto, max-w-[80%]
  - Bubble: bg-white, border border-outline-variant, text-on-surface, rounded-t-2xl rounded-br-2xl, px-4 py-3
  - Text: body-md, leading-relaxed
  - Timestamp: text-[10px], text-slate-400, mt-1

- **Acceptance Criteria:**
  - Messages hiển thị conversation flow tự nhiên
  - Scroll to bottom khi có message mới
  - RM message: "Chị Vy ơi, em thấy chị đang cân nhắc về lãi suất..."
  - Customer message: "Ừ, em thấy bên ngân hàng khác lãi suất thấp hơn..."

### FR-SS3.6: AI Script Suggestion (Premium Card)
- Card styling:
  - Border: border-2 border-[#c18ce3] (on-primary-container color)
  - Background: bg-white
  - Rounded-2xl, p-4, shadow-md
  - Gradient subtle overlay (optional)

- Header:
  - Badge "AI RECOMMENDATION" (bg-primary-container, text-on-primary-container, rounded-full, px-3 py-1, text-label-sm, font-bold)
  - Icon bolt (filled, text-secondary-container) bên trái badge text

- Content:
  - Script text (font-semibold, text-primary, body-lg, leading-relaxed)
  - Nội dung: Gợi ý câu trả lời cho RM dựa trên tình huống selected

- Tags (flex gap-2, mt-3):
  - "Highlight: Benefits" (bg-green-50, text-green-700, rounded-full, px-3 py-1, text-label-sm)
  - "Tone: Professional" (bg-blue-50, text-blue-700, rounded-full, px-3 py-1, text-label-sm)

- CTA Button:
  - "Áp dụng script này" (bg-secondary-container, text-white, rounded-xl, h-12, font-bold, w-full)
  - Icon send (right side)
  - Tap → Toast "✓ Đã áp dụng script!" + insert vào chat

- **Acceptance Criteria:**
  - AI suggestion thay đổi theo situation chip selected
  - Card có visual premium (border gradient, shadow)
  - CTA button prominent
  - Script content relevant theo context conversation

### FR-SS3.7: Insights Bento (2 Columns)
- Grid 2 cột (grid-cols-2, gap-3):
  - **Card 1:** "Tỷ lệ chốt" — value "85%" (headline-md, font-bold, text-primary) + label (label-sm, text-slate-500) + bg-white rounded-xl p-4 border
  - **Card 2:** "Phân hạng" — value "PRIO" (headline-md, font-bold, text-secondary-container) + label "Priority Customer" (label-sm, text-slate-500) + bg-white rounded-xl p-4 border
- **Acceptance Criteria:**
  - Data từ AI scoring engine
  - Visual hierarchy: value lớn, label nhỏ
  - Cards same height

---

## FR-SS4: Màn hình Product Handbook (Cẩm nang sản phẩm)

### FR-SS4.1: Top AppBar
- Back button → navigate về view-hub
- Title "Customer Insights" (text-primary, font-bold)
- RM Avatar (right, 32x32)

### FR-SS4.2: Search Bar
- Full-width search input:
  - Icon search (left, text-slate-400)
  - Placeholder: "Tìm kiếm sản phẩm, dịch vụ..." (text-outline)
  - h-12, rounded-xl, bg-white, border border-outline-variant
  - Focus: ring-2 ring-primary, border-primary
- **Acceptance Criteria:**
  - Debounce 300ms
  - Filter product cards realtime
  - Clear button (X) khi có text
  - Empty state nếu không tìm thấy

### FR-SS4.3: Filter Chips
- Horizontal scroll (overflow-x-auto, no-scrollbar, flex gap-2):
  - **"Tất cả"** (active: bg-secondary-container, text-white, rounded-full, font-bold, shadow-sm)
  - "Thẻ" (inactive: bg-white, border border-outline-variant, text-on-surface-variant, rounded-full)
  - "Vay" (inactive)
  - "Tiết kiệm" (inactive)
  - "Bảo hiểm" (inactive)
- **Acceptance Criteria:**
  - Single select
  - Active chip: orange (secondary-container) background
  - Filter product list theo category
  - Smooth transition khi switch

### FR-SS4.4: Product Cards (Vertical Stack)
- Mỗi product card (space-y-4):
  - Container: bg-white, rounded-[24px], overflow-hidden, border border-slate-100, shadow-sm
  - **Hero Image Area** (h-48, relative):
    - Background gradient (product-specific color)
    - Category badge (absolute top-3 left-3): bg-white/90, rounded-full, px-3 py-1, text-label-sm, font-bold
    - Product name (absolute bottom-4 left-4): text-white, headline-sm, font-bold, text-shadow
    - Gradient overlay (absolute inset-0, bg-gradient-to-t from-black/60 to-transparent)
  - **Content Area** (p-4, space-y-3):
    - USP Highlight card (bg-surface-container-low, rounded-xl, p-3, flex items-center gap-3):
      - Icon (specific per product, text-primary)
      - Label (label-sm, text-slate-500)
      - Value (body-lg, font-bold, text-primary)
    - USP text items (flex items-start gap-2):
      - Icon bolt/event_repeat (text-secondary-container, text-[18px])
      - Text (body-md, text-on-surface)
    - Sales quote (italic, body-md, text-on-surface-variant):
      - Border-left-4 border-secondary-container
      - Padding-left pl-4
      - Italic text: câu gợi ý bán hàng
    - CTA: "Xem kịch bản tư vấn" (text-secondary-container, font-bold, flex items-center gap-1, icon arrow_forward)

- **Product 1: Thẻ EVO**
  - Hero: gradient purple-to-blue
  - Category: "Thẻ tín dụng"
  - USP highlight: "Hoàn tiền" — "10%"
  - USP: "Hoàn tiền không giới hạn cho mọi giao dịch"
  - USP: "Miễn phí thường niên năm đầu"
  - Quote: "Với thẻ EVO, anh/chị sẽ được hoàn tiền 10% cho mọi chi tiêu hàng ngày..."
  - CTA → navigate sang view-script

- **Product 2: Vay HomeLoan**
  - Hero: gradient green-to-teal
  - Category: "Vay mua nhà"
  - USP highlight: "Lãi suất" — "6.9%/năm"
  - USP: "Lãi suất ưu đãi cố định 12 tháng đầu"
  - USP: "Thời hạn vay lên đến 30 năm"
  - Quote: "Gói HomeLoan với lãi suất chỉ 6.9%/năm, giúp anh/chị an tâm sở hữu ngôi nhà mơ ước..."
  - CTA → navigate sang view-script

- **Product 3: Tiết kiệm Đắc Lộc**
  - Hero: gradient orange-to-amber
  - Category: "Tiết kiệm"
  - USP highlight: "Lãi suất" — "7.2%/năm"
  - USP: "Lãi suất hấp dẫn, linh hoạt kỳ hạn"
  - USP: "Rút trước hạn vẫn được hưởng lãi"
  - Quote: "Tiết kiệm Đắc Lộc giúp tiền của anh/chị sinh lời tối đa với lãi suất lên đến 7.2%..."
  - CTA → navigate sang view-script

- **Acceptance Criteria:**
  - Cards responsive, full-width
  - Hero image area có gradient overlay đẹp
  - CTA "Xem kịch bản tư vấn" navigate sang AI Script với context sản phẩm
  - Scroll smooth giữa các cards
  - Filter chips filter đúng category

---

## FR-SS5: Toast Messages

### FR-SS5.1: Success Messages
- **Copy script:** "✓ Đã sao chép kịch bản!" — Duration 3s
- **Apply script:** "✓ Đã áp dụng script!" — Duration 3s
- **Regenerate:** "✓ Đã tạo kịch bản mới!" — Duration 3s

### FR-SS5.2: Warning Messages
- **Timer hết:** "⏰ Thời gian tư vấn đã hết!" — Warning style, Duration 5s
- **AI loading slow:** "⏳ AI đang phân tích, vui lòng chờ..." — Duration persistent until done

### FR-SS5.3: Error Messages
- **AI fail:** "✗ Không thể tạo kịch bản. Vui lòng thử lại." — Action: "Thử lại"
- **Network error:** "⚠ Mất kết nối. Một số tính năng AI không khả dụng." — Persistent

---

## FR-SS6: Cross-Navigation

### FR-SS6.1: Internal Navigation
- Hub → AI Script (view-script): Tap "AI Gợi ý kịch bản bán" card
- Hub → AI Situation (view-situation): Tap "AI Đề xuất theo tình huống" card
- Hub → Product Handbook (view-products): Tap "Cẩm nang sản phẩm" card
- Product card CTA → AI Script (view-script): "Xem kịch bản tư vấn"
- All sub-views Back → Hub (view-hub)

### FR-SS6.2: External Navigation
- Bottom Nav "Home" → `dashboard.html`
- Bottom Nav "Cus360" → `cus360.html`
- Bottom Nav "Leads" → `leads.html`
- Bottom Nav "Tasks" → `tasks.html`
- Bottom Nav "More" → toggleMoreMenu()
- Customer name tap → `cus360.html`
- More menu: Opportunities → `opportunities.html`, Cases → #

---

## Non-Functional Requirements

### NFR-SS1: Performance
- Page load < 1.5s
- AI script generation < 3s (with loading indicator)
- View transitions < 300ms (smooth animation)
- Scroll performance 60fps
- Chat interface render < 500ms

### NFR-SS2: AI Engine
- Script generation based on: Customer profile, product interest, conversation context
- Situation-based suggestions update within 2s of chip selection
- Fallback: Pre-built scripts nếu AI unavailable
- Confidence score hiển thị cho mỗi suggestion

### NFR-SS3: Offline Support
- Product Handbook cached offline (text + basic info)
- AI features require online connection
- Offline indicator trên AppBar khi mất mạng
- Cached scripts available offline (last generated)

### NFR-SS4: Accessibility
- All interactive elements: min touch target 44x44px
- Color contrast ratio ≥ 4.5:1 cho text
- Screen reader labels cho icons và buttons
- Focus states visible cho keyboard navigation

### NFR-SS5: Security
- AI-generated content không chứa thông tin nhạy cảm KH
- Script clipboard clear sau 5 phút
- Audit log: script generation, copy, apply actions
- Role-based: Chỉ RM assigned mới thấy KH insights

### NFR-SS6: Analytics
- Track: Script generation count, copy rate, apply rate
- Track: Product handbook views per product
- Track: Situation chip usage frequency
- Track: Time spent per view

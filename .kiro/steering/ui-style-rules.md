---
inclusion: auto
---

# UI Style Rules - TPBank CRM Mobile

## Design System Tokens

### Colors
- **Primary:** #390259 (Brand Purple) — headers, active states, primary text
- **Primary Container:** #502070 — dark cards (AI insights), selected states
- **Secondary:** #a04100 — secondary text, data highlights
- **Secondary Container / Accent Orange:** #FC7728 — CTAs, FAB, active nav, conversion buttons
- **Surface:** #f8f9ff — page background
- **Surface Container Low:** #eff4ff — card section backgrounds
- **On Surface:** #0b1c30 — primary text
- **On Surface Variant:** #4c444f — secondary/label text
- **Error:** #ba1a1a — destructive actions, alerts
- **Success:** green-600 — positive states, completed

### Typography (Manrope)
- headline-lg: 28px/36px, weight 700
- headline-md: 22px/28px, weight 600
- headline-sm: 18px/24px, weight 600
- body-lg: 16px/24px, weight 400
- body-md: 14px/20px, weight 400
- label-md: 12px/16px, weight 600, letter-spacing 0.02em
- label-sm: 11px/14px, weight 500

### Spacing
- Page margin: 16px (px-4)
- Section gap: 20-24px (space-y-5 or space-y-6)
- Card padding: 16px (p-4)
- Stack small: 8px, medium: 16px, large: 24px

### Border Radius
- Buttons: rounded-xl (12px) for large, rounded-full for pills/chips
- Cards: rounded-xl (12px) or rounded-2xl (16px)
- Inputs: rounded-xl (12px)
- Avatar: rounded-full (circle) or rounded-2xl (large square)
- Device frame: rounded-[40px]

---

## Button Standards

### Primary Button (Main CTA — Orange)
```
class="w-full h-14 bg-secondary-container text-white rounded-2xl font-headline-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
```
Usage: Form submit, main page action, all primary CTAs. Color: Orange #FC7728

### Accent/Conversion Button (Same as Primary — Orange)
```
class="w-full bg-secondary-container text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
```
Usage: Chuyển đổi, Xác nhận quan trọng. Same orange for consistency.

### Secondary Button (Outlined)
```
class="px-4 py-2 border border-primary text-primary font-bold rounded-full active:scale-95 transition-transform"
```
Usage: Cancel actions, secondary options

### Text Button
```
class="text-primary font-semibold py-3 rounded-xl active:bg-slate-50 transition-colors"
```
Usage: Hủy, links, tertiary actions

### Icon Button (Circle)
```
class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container text-primary active:bg-primary-container active:text-white transition-all"
```
Usage: Call, Email, quick actions in cards

### Destructive Button
```
class="w-full bg-error text-white font-bold py-3 rounded-xl active:scale-95 transition-all"
```
Usage: Xoá, actions không thể undo

### Filter Chip (Active)
```
class="flex items-center gap-1.5 px-4 py-2 bg-primary-container text-on-primary-container rounded-full text-label-md whitespace-nowrap"
```

### Filter Chip (Inactive)
```
class="px-4 py-2 bg-white border border-outline-variant text-on-surface-variant rounded-full text-label-md whitespace-nowrap"
```

---

## Card Standards

### Standard Card
```
class="bg-white p-4 rounded-xl border border-outline-variant shadow-sm"
```

### Elevated Card (interactive)
```
class="bg-white p-4 rounded-xl border border-outline-variant shadow-sm hover:shadow-md active:scale-[0.99] transition-all cursor-pointer"
```

### AI/Highlight Card
```
class="bg-primary-container p-4 rounded-xl border border-primary/20 shadow-sm"
```
Text inside: text-white, text-primary-fixed/90

### Warning Card
```
class="bg-white p-4 rounded-xl border border-error-container/50 shadow-sm"
```

---

## Navigation Standards

### Bottom Navigation Bar
- Container: `fixed bottom-0 left-1/2 -translate-x-1/2 w-[430px] max-w-full flex justify-around items-center px-2 py-2 pb-6 bg-white border-t border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] z-50 rounded-b-[40px]`
- Active tab: `text-[#F37021] bg-[#F37021]/10 rounded-xl` + icon filled
- Inactive tab: `text-slate-400` + icon outlined
- Tab items: Home, Cus360, Leads, Tasks, More
- Links: dashboard.html, cus360.html, leads.html, #, #

### Top AppBar
- Container: `bg-white sticky top-0 z-50 flex justify-between items-center w-full px-4 h-16 shadow-sm border-b border-slate-100`
- Title: `text-lg font-extrabold text-primary` or `text-headline-sm text-primary`
- Back button: `w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 active:scale-95`

### FAB (Floating Action Button)
- Position: `fixed bottom-24 right-[calc(50%-215px+24px)]` (inside device frame)
- Style: `w-14 h-14 bg-secondary-container text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40`

---

## Toast Standards

### Success Toast
```
class="fixed top-20 left-1/2 -translate-x-1/2 w-[400px] max-w-[calc(100%-32px)] bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-[100] animate-slide-down"
```

### Error Toast
```
class="fixed top-20 left-1/2 -translate-x-1/2 w-[400px] max-w-[calc(100%-32px)] bg-error-container border border-error/20 text-error px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-[100]"
```

### Warning Toast
```
class="fixed top-20 left-1/2 -translate-x-1/2 w-[400px] max-w-[calc(100%-32px)] bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-[100]"
```

---

## Modal/Dialog Standards
```
Overlay: class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] flex items-center justify-center p-6"
Dialog: class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4"
Title: class="text-headline-sm text-on-surface font-bold text-center"
Body: class="text-body-md text-on-surface-variant text-center"
```

---

## Device Frame (All Pages)
```
class="device-frame bg-surface text-on-surface no-scrollbar"
style: width:430px; height:932px; border-radius:40px; box-shadow:0 25px 60px rgba(0,0,0,0.15); overflow-y:auto; overflow-x:hidden;
```

---

## Status Chips
- Active/Hoạt động: `bg-green-100 text-green-700`
- Mới: `bg-green-100 text-green-800`
- Đang xử lý/Chăm sóc: `bg-blue-100 text-blue-800`
- Chờ xử lý: `bg-orange-100 text-orange-700`
- Hoàn thành: `bg-green-100 text-green-700`
- Từ chối: `bg-slate-100 text-slate-600`
- Hết hạn/Quá hạn: `bg-red-100 text-error`
- Hot: `bg-error-container text-error`
- Warm: `bg-secondary-fixed text-secondary`
- Cold: `bg-blue-100 text-blue-700`
- Ưu tiên cao: `bg-error-container text-error`

---

## Input Standards
```
class="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-body-lg outline-none transition-all placeholder:text-outline"
```
Label: `class="text-label-md text-on-surface-variant flex items-center gap-2"`
Error: `class="text-label-sm text-error mt-1 flex items-center gap-1"`

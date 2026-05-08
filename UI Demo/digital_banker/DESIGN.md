---
name: Digital Banker
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#4c444f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#7d7480'
  outline-variant: '#cfc3d1'
  surface-tint: '#7a499a'
  primary: '#390259'
  on-primary: '#ffffff'
  primary-container: '#502070'
  on-primary-container: '#c18ce3'
  inverse-primary: '#e3b5ff'
  secondary: '#a04100'
  on-secondary: '#ffffff'
  secondary-container: '#fc7728'
  on-secondary-container: '#5d2300'
  tertiary: '#33104e'
  on-tertiary: '#ffffff'
  tertiary-container: '#4a2865'
  on-tertiary-container: '#b992d6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f4daff'
  primary-fixed-dim: '#e3b5ff'
  on-primary-fixed: '#2f004c'
  on-primary-fixed-variant: '#603180'
  secondary-fixed: '#ffdbcb'
  secondary-fixed-dim: '#ffb693'
  on-secondary-fixed: '#341000'
  on-secondary-fixed-variant: '#7a3000'
  tertiary-fixed: '#f2daff'
  tertiary-fixed-dim: '#e0b7fe'
  on-tertiary-fixed: '#2b0747'
  on-tertiary-fixed-variant: '#5a3875'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-mobile: 1rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
---

## Brand & Style
The visual language is built on the concept of "Digital Precision with a Human Touch." As an internal tool for TPBank staff, the design must prioritize efficiency and clarity while maintaining the bank's innovative and energetic brand identity. 

The style is **Corporate Modern**. It utilizes a structured layout and high-quality typography to ensure reliability, paired with soft geometry and vibrant accents to reflect TPBank’s tech-forward DNA. The interface avoids unnecessary decoration, focusing instead on data density that remains readable and accessible under high-pressure work environments.

## Colors
The palette is dominated by **Brand Purple (#502070)**, used for primary navigation, headers, and key branding moments to establish authority. **Accent Orange (#F37021)** is used surgically for primary calls-to-action (CTAs) and progress indicators, ensuring they "pop" against the deeper brand tones.

The background uses a tiered system of White (#FFFFFF) and an ultra-light gray surface (#F8FAFC) to separate content sections without using heavy borders. Success, Warning, and Error states should use standard semantic colors, but slightly desaturated to maintain the professional aesthetic.

## Typography
**Manrope** is selected for its exceptional legibility and modern, geometric character. It bridges the gap between a technical SaaS font and a friendly consumer font.

- **Headlines:** Use Bold or Semi-Bold weights in Purple for clear hierarchy.
- **Body Text:** Standardize on 14px for density on mobile screens, using a Slate-800 color for optimal contrast.
- **Labels:** Use uppercase and tracking (+2%) for tiny labels (like "STATUS") to ensure they remain readable at small sizes.

## Layout & Spacing
The layout follows a **fluid mobile-first grid**. The standard screen margin is 16px (1rem). 

A 4-pixel baseline grid is used to ensure vertical rhythm. Spacing between related items in a card (e.g., a customer name and their phone number) should be 4px or 8px, while spacing between distinct sections or cards should be 16px or 24px to create clear visual grouping.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and extremely soft **Ambient Shadows**. 

- **Level 0 (Background):** #F8FAFC (Light Gray).
- **Level 1 (Cards/Containers):** White (#FFFFFF) with a very subtle 1px border (#E2E8F0) or a soft shadow (Blur: 8px, Y: 2px, Opacity: 4% Black).
- **Level 2 (Modals/Popovers):** White with a more pronounced shadow (Blur: 20px, Y: 10px, Opacity: 8% Black).

Avoid heavy dropshadows; the goal is to make elements feel like they are resting lightly on the surface, not floating far above it.

## Shapes
In line with the "softly rounded" requirement, this design system uses a **0.5rem (8px)** base radius for standard components like buttons and input fields. 

Larger containers like Cards use **1rem (16px)** to create a friendly, modern containerized look. This specific curvature is chosen because it feels approachable and trustworthy—essential for banking software—without appearing too "bubbly" or unprofessional.

## Components
- **Buttons:** Primary buttons use the Orange (#F37021) background with White text for high visibility. Secondary buttons use a Purple outline. Buttons must have a minimum height of 48px for easy thumb-tapping.
- **Input Fields:** Softly rounded (8px) with a light gray fill and a subtle border that turns Purple on focus. Labels should always be visible above the input.
- **Cards:** The primary container for customer data. Use 16px internal padding and 16px corner radius. Group related data points with light dividers (#F1F5F9).
- **Chips:** Used for "Lead Status" or "Product Category." These should have a pill shape (fully rounded) and use light pastel backgrounds with darker text for the respective status.
- **Navigation:** A bottom navigation bar is essential for the mobile CRM, using the Brand Purple for the active icon state to anchor the brand identity.
- **KPI Indicators:** Use large, bold Purple numbers for key metrics (e.g., "Monthly Sales") to make them the focal point of the dashboard.
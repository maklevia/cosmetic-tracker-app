# Design System & UI

This document describes the visual identity and UI patterns of the Cosmetic Tracker application.

## 🎨 Color Palette
The app uses a "Cosmetic & Health" inspired palette, focusing on clean, professional tones to match the industry.

*   **Primary (Brand):** Pink/Rose tones (`#be185d`, `#831843`). Used for primary actions, branding, and status indicators.
*   **Secondary:** Soft creams and whites. Used for backgrounds to create a clean, clinical feel.
*   **Status Colors:**
    *   **Success:** Green (Product is healthy/Active).
    *   **Warning:** Amber (Expiring soon).
    *   **Danger/Expired:** Red/Deep Pink.

## 📐 Typography
*   **Headings:** Bold, sans-serif fonts for clear hierarchy.
*   **Body:** Regular sans-serif with generous line spacing for readability of ingredients and descriptions.
*   **Metadata:** Smaller, muted text for secondary info (e.g., brand names, PAO values).

## 🧩 Core Components
The app uses a consistent set of UI patterns:

### 1. The "Product Card"
*   Used in collections and search results.
*   Features: Image thumbnail, Title, Brand, and a status badge (Archived/Expired).

### 2. Dashboard Widgets
*   Horizontal scrolling lists for "Trending" and "Expiring Soon".
*   High visual contrast to grab user attention.

### 3. Forms & Inputs
*   Built using **Gluestack UI**.
*   Include floating labels, validation states (red borders on error), and clear helper text.
*   Consistent use of `DatetimePicker` for all date-related inputs to prevent formatting errors.

### 4. Modals & Alerts
*   Used for critical actions like archiving or deleting a product.
*   Follow native platform patterns (Alerts on iOS).

## ✨ Styling Approach
We use **NativeWind** (Tailwind CSS for React Native) to ensure consistency:
*   **Spacing:** A fixed 4px grid system (`m-1` = 4px, `m-4` = 16px).
*   **Borders:** Consistent rounded corners (`rounded-xl`, `rounded-full`) to create a modern, "soft" look.
*   **Shadows:** Subtle elevation (`shadow-sm`) to differentiate cards from the background.

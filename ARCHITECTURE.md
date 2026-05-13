# Frontend Architecture

This document outlines the architectural patterns and design decisions implemented in the Cosmetic Tracker mobile application.

## 🏗️ Folder Strategy: Feature-First
The application uses a **Feature-First** (or Modular) directory structure. Instead of grouping all hooks in one folder and all components in another, logic is localized to specific features:

```text
components/
└── MainScreen/
    ├── MainScreen.tsx        (Entry point)
    ├── components/           (Feature-specific UI)
    ├── hooks/                (Feature-specific logic)
    └── typedefs.ts           (Type definitions)
```

**Benefits:**
*   **Encapsulation:** All logic related to the "Main Screen" is contained in one place.
*   **Scalability:** New features can be added without bloating global directories.
*   **Maintainability:** Easier to locate and fix bugs within a specific module.

## 🚦 Navigation: Expo Router
The app leverages **Expo Router (v3)** for file-based navigation.
*   **`(tabs)`:** Groups the primary bottom-tab navigation (Home, Collection, Add Product).
*   **Stack Navigation:** Screens like `product-details` or `edit-product` are part of the root stack for a native-like transition experience.
*   **Layouts:** `_layout.tsx` files handle common UI elements (like headers) and authentication state protection.

## 🧠 Logic & State Management
### Custom Hooks Pattern
The project strictly follows a **View-Model separation** via Custom Hooks. Components focus on UI/Rendering, while hooks handle:
1.  **API interaction** (Fetching products, posting reviews).
2.  **State transformation** (Calculating if a product is expired).
3.  **User interactions** (Handling button presses, form validation).

### State Management
*   **Local State:** Managed via `useState` and `useReducer` within features.
*   **Global State:** Simple persistence (like Auth Tokens) is handled via `AsyncStorage` and passed through a Context Provider.

## 🎨 Styling & UI System
*   **NativeWind:** Provides a Tailwind-like developer experience. We use utility classes for responsive layouts and consistent spacing.
*   **Gluestack UI:** Used for complex base components (Modals, Form Controls, Inputs) to ensure accessibility and consistent behavior across platforms.

## 📅 Data & Date Logic
Since the core value of the app is tracking expiration, date handling is centralized in `utils/date.ts`.
*   **PAO Logic:** The app calculates expiration dates by adding months to the `openedDate`.
*   **Consistency:** All dates are stored as ISO strings and formatted for the user's locale at the UI layer.

## 📡 API Integration
The `api/` directory acts as a Data Access Layer:
*   **apiClient.ts:** Configures an Axios instance with base URLs and interceptors (for adding Auth tokens).
*   **Services:** Each entity (User, Product, Collection) has a dedicated service file, keeping API calls clean and reusable.

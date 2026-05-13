# Cosmetic Tracker (Mobile Application)

## 📌 Project Overview
The **Cosmetic Tracker** mobile application is a high-performance cross-platform tool designed to help users monitor the health and safety of their cosmetic products. Built with **React Native** and **Expo**, the app provides a seamless interface for tracking "Period After Opening" (PAO), discovering new products, and managing personal beauty collections.

This application serves as the client-side interface for the Cosmetic Tracker ecosystem, interacting with a dedicated REST API to provide real-time updates and cloud synchronization.

## 🚀 Technical Stack
*   **Framework:** React Native (Expo SDK 54)
*   **Navigation:** Expo Router (File-based routing)
*   **Styling:** NativeWind (Tailwind CSS for React Native)
*   **UI Components:** Gluestack UI & Custom Component Library
*   **Icons:** Lucide Icons & Ionicons
*   **State Management:** React Hooks & Context API
*   **Data Fetching:** Axios with dedicated Service Layer
*   **Imaging:** Expo Image Picker (for profile and product photos)

## 🛠️ Core Features
*   **Smart Dashboard:** Visual indicators of product status (Archived, Expiring Soon, Expired).
*   **Discovery Hub:** Browse "Trending Products" based on community popularity.
*   **Unified Search:** Search across the global product database and personal collection simultaneously.
*   **Lifecycle Management:** Log product opening dates, set PAO values, and archive items with usage feedback.
*   **Community Reviews:** Read and write product reviews with star ratings.
*   **Personalization:** User profile management, including theme selection and language preferences (to be implemented).

## 📋 Setup and Installation

### 1. Prerequisites
*   Node.js (v18+)
*   Expo Go app (on iOS/Android) or a simulator setup.

### 2. Environment Configuration
The app uses an API client located in `api/apiClient.ts`. Ensure your server IP is correctly configured for your local environment (especially when testing on physical devices).

### 3. Install & Start
```bash
cd cosmetic-tracker-app
npm install
npx expo start
```
Scan the QR code with your **Expo Go** app to run the project.

## 📁 Key Directories
*   `app/` — Expo Router entry points (screens and layouts).
*   `components/` — Feature-based UI components (e.g., `MainScreen`, `AddProduct`).
*   `api/` — API client configuration and service definitions.
*   `hooks/` — Global and feature-specific custom hooks.
*   `utils/` — Helper functions for dates, storage, and display formatting.
*   `assets/` — Static images, fonts, and icons.

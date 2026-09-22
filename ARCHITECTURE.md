# 🏗️ RecipeHub AI — Complete System Architecture & Technical Design

## 📋 Executive Overview

**RecipeHub AI** is an intelligent, full-stack recipe studio designed for real-time culinary generation, kitchen workflow management, and meal planning. The architecture employs a **secure server-side proxy pattern** integrating Google's Gemini models with a responsive, modern React 19 single-page application.

---

## 🏛️ System Architecture Topology

```
                                  ┌───────────────────────────────┐
                                  │      Client Web Browser       │
                                  │   (React 19 + TypeScript)     │
                                  └───────────────┬───────────────┘
                                                  │
                                                  │ HTTPS / JSON
                                                  ▼
                                  ┌───────────────────────────────┐
                                  │    Express API Gateway        │
                                  │   • Input Validation          │
                                  │   • Prompt Sanitization       │
                                  │   • Secret Isolation (API Key)│
                                  └───────────────┬───────────────┘
                                                  │
                                                  │ SDK (@google/genai)
                                                  ▼
                                  ┌───────────────────────────────┐
                                  │   Google Gemini 3.8 Flash     │
                                  │   • Structured JSON Mode      │
                                  │   • Culinary Intelligence     │
                                  └───────────────────────────────┘
```

---

## 🧩 Architectural Layers

### 1. Presentation Layer (React 19 + Tailwind CSS v4)
- **Component Hierarchy**: Modular views (`HomeLandingView`, `AiGeneratorView`, `PantryView`, `MealPlannerView`, `MyRecipesView`, `SavedCollectionsView`, `ProfileView`, `SettingsView`).
- **Interactive Cooking Mode**: Modals with active countdown timer states, audio alerts, and step-by-step checklist interactions.
- **State Management**: Centralized unified state with local persistence (`localStorage`) for custom recipes, saved bookmarks, meal schedules, and user profile data.

### 2. Backend & Proxy Layer (`server.ts`)
- **Node.js Express Server**: Secure REST endpoint router.
- **Security Isolation**: `GEMINI_API_KEY` is strictly managed server-side and never exposed to the client.
- **Vite Middleware**: Serves compiled SPA bundle in production while supporting hot dev tooling.

### 3. Generative AI Engine (`@google/genai`)
- **Model**: `gemini-3.8-flash` optimized for low-latency (<2s) and structured JSON reasoning.
- **Schema Enforcement**: Requests `application/json` output format directly from Gemini, preventing markdown formatting errors and ensuring type safety.

---

## 🔄 End-to-End Data Flow

1. **User Request**: User inputs ingredients (e.g. *"chicken breast, garlic, rosemary"*), dietary targets (e.g. *"Gluten-Free"*), and time constraint (*"25 mins"*).
2. **Proxy Dispatch**: Frontend dispatches `POST /api/ai/generate-recipe`.
3. **Prompt Assembly**: Express validates parameters and wraps them in a rigid system prompt with explicit JSON output requirements.
4. **Gemini Processing**: Gemini parses culinary chemistry, generates steps with embedded timers, nutrition macros, and sommelier tips.
5. **JSON Parsing & Validation**: Backend parses and validates structure before returning payload to frontend.
6. **Client Hydration**: Client normalizes recipe, adds unique ID, and displays the recipe card with options to Cook, Save, Plan, or Add to Grocery List.

---

## 🛡️ Security & Privacy Design
- **Zero API Key Leakage**: No client-side environment variable exposure.
- **Input Sanitization**: Client & server trim, type-check, and boundary-limit string lengths before sending to LLM.
- **Privacy-First Persistence**: User recipes, pantry inventory, and meal plans are stored locally on the user's device.

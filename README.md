# 🧠 Signals Showcase UI Kit

This project demonstrates a minimal yet powerful reactive architecture built on top of React 19, Vite 6, and Tailwind CSS v4.1.4. It introduces custom signal-based reactivity (similar to SolidJS or Vue signals) with fine-grained updates and no unnecessary re-renders.

The goal is to clearly compare classic React `useState` behavior against a `signal()`-driven model, while maintaining a scalable and reusable UI component system.

---

## ✨ Features

### ⚙️ Core Reactive System
- `createSignal()` — Minimal reactive signal with subscribers
- `createSignalObject()` — Declarative API (`signal.value`, `signal.set()`)
- `effect()` — Autorun on signal dependency change
- `useReactiveDOM()` — DOM updates without triggering React re-renders
- `useSignalValue()` — Signal to React bridge using `useState`
- `useRenderCount()` — Utility to display React component render count

### 🧩 Reusable UI Components
- `Button` — With `size` (`sm`, `md`, `lg`) and `variant` (`primary`, `secondary`, `danger`)
- `Title` — Supports `h1`, `h2`, `h3` with Tailwind styles
- `Card` — Supports `size` and `variant` (`default`, `accent`, `gray`, `pink`)
- `RenderCount` — Visualizes number of re-renders for component

### 🧠 Signal Showcase Blocks
- React vs Signal state update comparison
- Signal connected directly to DOM (fine-grained updates)
- Signal connected to React state (bridged reactivity)

---

## 📁 Project Structure (Simplified)

```
src/
├── components/
│   ├── ui/         # Button, Card, Title, etc.
│   └── blocks/     # SignalBlock, StateBlock, etc.
├── core/           # Reactive system: createSignal, effect, hooks
├── hooks/          # Shared utils: useRenderCount, etc.
└── styles/         # Centralized variant/size maps (variantMap, sizeMap)
```

---

## 🛣️ Roadmap

### ✅ Done
- Base signal engine + object API
- React comparison component
- UI Kit with consistent styling
- Tailwind 4.1 integration with Vite 6

### 🔜 Upcoming
- [ ] `Number.tsx` — Animated number component (count up effect)
- [ ] `Layout.tsx` — Responsive layout with dark/light theme
- [ ] `SignalGroup.tsx` — Multi-signal visualizer with live sync
- [ ] `ThemeToggle.tsx` — Signal-based theme switcher
- [ ] `signal-store/` — Centralized reactive store
- [ ] DevTools panel or debug overlay

---

## 🚀 Tech Stack

- React 19
- Tailwind CSS v4.1.4
- Vite 6
- TypeScript

---

## 📦 Getting Started

1. `npm install`
2. `npm run dev`
3. View app at [http://localhost:5173](http://localhost:5173)

---

## 🧠 Why Signals?

- No over-rendering
- Global reactive state without context
- Fine-grained updates at DOM level
- Decouples state from component hierarchy
# Aldena Studio — Agent & Developer Guide

## 📌 Project Overview
**Aldena** is an editorial-grade creative agency and digital brand showcase web application. Built with modern web standards, rich editorial typography, smooth scroll physics, and dynamic motion animations.

---

## 🛠️ Technology Stack
- **Framework:** Next.js 16.3 (App Router, Turbopack)
- **Library:** React 19.2
- **Styling:** Tailwind CSS v4, PostCSS, Vanilla CSS Utilities
- **Animation & Motion:** GSAP 3.15 (ScrollTrigger), Framer Motion 13, Lenis (Smooth Scroll)
- **3D & Canvas:** Three.js 0.185, @react-three/fiber, shadergradient
- **Icons:** Lucide React

---

## 📁 Directory Structure
```
Aldena/
├── app/                      # Next.js App Router routes & layouts
│   ├── about/                # Studio About page
│   ├── contact/              # Contact & inquiry page
│   ├── projects/             # Projects index & dynamic [slug] routes
│   ├── globals.css           # Custom styles & font variable integrations
│   ├── layout.tsx            # Root layout (Fonts, Navbar, Footer, Cursor)
│   └── page.tsx              # Home landing page wrapper
├── components/
│   ├── sections/             # Core page layout sections (Hero, Studio, Services, Process, FAQ, Footer)
│   ├── ui/                   # Reusable UI widgets, interactive elements, custom cursors, animations
│   └── landingPage.tsx       # Main home view composition
├── data/
│   └── projectsData.ts       # Structured project portfolio data & case study details
└── public/assets/            # Optimized WebP images & brand media assets
```

---

## 🚀 Key Commands
```bash
# Start local development server
npm run dev

# Production build & static page generation
npm run build

# Run ESLint checks
npm run lint

# Start production server
npm run start
```

---

## 🎨 Design System & Fonts
The project utilizes Google Fonts configured in `app/layout.tsx`:
- **Bodoni Moda** (`--font-bodoni`)
- **Instrument Serif** (`--font-instrument`)
- **Playfair Display** (`--font-playfair`)
- **Baskervville** (`--font-baskervville`)

---

## ⚠️ Coding Guidelines & Best Practices
1. **React 19 Compatibility:**
   - Avoid calling `setState` synchronously within `useEffect` hooks (e.g. for initial window checks); handle initial state lazily or via state initializers to prevent cascading re-renders.
2. **GSAP & Motion Cleanups:**
   - Always wrap GSAP ScrollTrigger animations in `gsap.context()` and revert them in cleanup functions (`return () => ctx.revert()`).
3. **Next.js Image Optimization:**
   - Use `next/image` with explicit `sizes` and `fill` props where appropriate for responsive, high-performance visual delivery.
4. **Client Directives:**
   - Ensure components using hooks (`useRef`, `useState`, `useEffect`, GSAP) include the `'use client'` directive at the top of the file.

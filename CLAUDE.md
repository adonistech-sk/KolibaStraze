# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Koliba Pacho" — a single-page marketing website for a traditional Slovak restaurant located in Velka Causa near Prievidza. The site is in **Slovak language** (`lang="sk"`). All user-facing text must remain in Slovak.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint across the project

No test framework is configured.

## Tech Stack

- **React 19** (JSX, no TypeScript)
- **Vite 8** with `@vitejs/plugin-react`
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (imported in `src/index.css` with `@import "tailwindcss"`)
- **Framer Motion** for scroll-triggered animations and accordion transitions
- **Lucide React** for icons

## Architecture

This is a single-component app. Almost everything lives in `src/App.jsx` (~830 lines):

- **Reusable components** defined at the top of App.jsx: `FadeIn` (scroll-triggered animation wrapper), `AccordionItem` (FAQ accordion), custom SVG social icons (`InstagramIcon`, `FacebookIcon`)
- **Main `App` component** renders all page sections inline: Navbar → Hero → About → Features/Services → Menu Preview → Gallery → Reservation CTA → Contact (hours, map, form) → FAQ → Footer
- Navigation is smooth-scroll via anchor IDs (`domov`, `o-nas`, `jedalny-listok`, `galeria`, `rezervacia`, `kontakt`)

## Styling

- Tailwind v4 theme is defined in `src/index.css` using `@theme` directive with a custom `brand` color palette (warm browns, `brand-50` through `brand-900`) and `--font-serif: 'Playfair Display'`
- Google Fonts (`Playfair Display`) loaded via CSS `@import url()`
- `src/App.css` is effectively empty (legacy styles removed)

## External Resources

- Logo image hosted on Supabase Storage (URL in App.jsx navbar)
- Hero and food images referenced as `/hero.png` and `/food.png` from the `public/` directory
- Google Maps embed iframe for restaurant location

## ESLint

Flat config in `eslint.config.js`. Notable custom rule: `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).

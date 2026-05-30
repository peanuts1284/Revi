# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (port 3000, falls back to 3002+ if occupied)
npm run build    # production build + type-check
npm run lint     # ESLint via next lint
npm start        # serve the production build
```

No test suite is configured yet.

## Architecture

Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3.

```
app/
  layout.tsx      # root layout — loads Instrument Serif via next/font, injects --font-serif CSS var
  page.tsx        # single page, composes all section components in order
  globals.css     # Tailwind directives, base resets, hero animation keyframes (.hero-in*)

components/       # one file per section, all server components except those marked below
hooks/
  useInView.ts    # "use client" — IntersectionObserver, fires once then disconnects
```

**Client components** (require `"use client"`): `Navbar` (scroll state), `AnimateIn` (uses `useInView`), `Waitlist` (form state). Everything else is a server component.

## Design system

All tokens live in `tailwind.config.ts`. Use these names — never raw hex values in components:

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#0D1F1A` | page background |
| `surface` | `#122B23` | cards |
| `forest` | `#1E3D32` | borders, dividers |
| `gold` / `gold-light` | `#C9A84C` / `#E8C76A` | primary accent |
| `cream` | `#F0EDE6` | primary text |
| `sage` | `#7A9E8E` | muted text |
| `ink` | `#3d6050` | very muted / decorative text |

**Typography:** `font-serif` (Instrument Serif, headlines) and `font-sans` (system-ui, body). The serif font is self-hosted via `next/font/google` — do not add a Google Fonts `@import`.

## Animation conventions

**Hero entrance** (load-time): add class `hero-in`, `hero-in-1`, `hero-in-2`, or `hero-in-3` directly in JSX. These are CSS animations with `fill: both` defined in `globals.css`. They stagger at 90 ms intervals.

**Scroll-triggered entrance**: wrap any element in `<AnimateIn delay={n}>` where `delay` is milliseconds. Stagger sibling cards by passing `delay={i * 55}` (or similar). `AnimateIn` renders a `<div>` — avoid wrapping block-level elements that already provide layout.

Keep all transitions under 300 ms. Use `cubic-bezier(0.16, 1, 0.3, 1)` (fast-out easing). No bounce or spring curves.

## Adding a new section

1. Create `components/MySection.tsx` as a server component (no `"use client"` unless it needs state/effects).
2. Import and place it in `app/page.tsx`.
3. Use `<AnimateIn>` for scroll entrance and the design tokens above.
4. Separate sections with `<Divider />` or `border-t border-forest` on the section element itself.

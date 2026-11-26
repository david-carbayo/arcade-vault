# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Arcade Vault is an online platform for playing games and competing for the highest score. So far it is a visual MVP (SPECs 01 and 02) with placeholder content and no data, game logic or accounts: a landing page at `/`, the game gallery at `/juegos`, and the detail, player, hall of fame and sign-in screens. `/juegos/[slug]` and `/juegos/[slug]/jugar` only accept the slugs in `componentes/slugs.ts`; anything else is a 404.

Work follows Spec Driven Development with the `/spec` and `/spec-impl` skills from [Klerith/fernando-skills](https://github.com/Klerith/fernando-skills) (`npx skills@latest add Klerith/fernando-skills`). Write a spec first, then implement from it; follow the practices that repo recommends.

## Commands

```bash
npm run dev     # dev server (Turbopack), http://localhost:3000
npm run build   # production build; also type-checks
npm run start   # serve the production build
npm run lint    # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
npx next typegen && npx tsc --noEmit  # type-check only (typegen creates LayoutProps/PageProps)
```

There is no test runner set up yet.

## Workflow and CI

- `main` is protected: every change goes through a pull request from its own branch, and the `ci` check must pass with the branch up to date. Direct and force pushes to `main` are refused, admins included.
- `.github/workflows/ci.yml` (job `ci`) runs `npm ci`, `npm run lint`, `npx next typegen && npx tsc --noEmit` and `npm run build` on Node 22. Run the same commands locally before pushing.

## Visual style

The app's look is a dark retro-arcade/neon theme, ported verbatim from `references/templates/styles.css` into `app/globals.css`, followed by the home page blocks (`HOME PAGE`, `ACTIVITY`, `PRICING`) from `references/templates/home-about/styles.css` (CSS variables such as `--bg`, `--ink`, `--cyan`, `--magenta`, `--yellow`; perspective grid, scanlines, neon glows and pure-CSS game covers such as `cover-bricks`). Keep the prototype's class names (`av-nav`, `card`, `btn`, `lb-row`…) and build new UI from the existing classes before adding CSS. The only change from the template is that `--pixel` and `--mono` point at the `next/font` variables.

Fonts are loaded in `app/layout.tsx` with `next/font/google` (no requests to Google Fonts): Press Start 2P (`--font-press-start`, pixel headings), JetBrains Mono (`--font-jetbrains-mono`, body text) and Courier Prime (`--font-courier-prime`, fallback). The layout mirrors the template's body: `.av-bg`, `.av-noise` and a `#root` wrapper that the CSS relies on for stacking.

Shared components live in `componentes/` with Spanish PascalCase names (`BarraNavegacion.tsx`, `TarjetaJuego.tsx`…), imported as `@/componentes/...`. Routes and UI text are in Spanish.

`references/templates/` stays as the visual reference: `Arcade Vault.html` with its `.jsx` screens (React from unpkg, so serve the folder over HTTP to view it). `references/templates/home-about/` is the reference for the home page and for the About page, which is not built yet (`about.jsx` and the `ABOUT PAGE` CSS block); `arcade-vault-standalone.html` there is a single-file build of the whole prototype. The home's sections fade in on scroll through `componentes/Revelar.tsx`, which adds `in` to `.reveal` elements. It is excluded from ESLint and its mixed Spanish/English names should not be copied.

## Stack and configuration

- Next.js 16.4 (App Router, `app/`), React 19.3, TypeScript strict. Path alias `@/*` maps to the repo root.
- Read the version-matched docs in `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`) before using any Next.js API; do not rely on memory.
- `next.config.ts` turns on `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`. With Cache Components, data fetching and caching follow the `"use cache"` / Suspense model, so check the docs before adding dynamic data or route config.
- Tailwind CSS v4 is wired through the `@tailwindcss/turbopack` loader in `next.config.ts` (there is no PostCSS config). It is installed but not imported: `app/globals.css` has no `@import "tailwindcss"`, because its preflight could override the ported styles. Theme tokens are the plain CSS variables on `:root` in `app/globals.css`.
- Route props use the generated global types (e.g. `LayoutProps<"/">`, `PageProps<"/…">`) rather than hand-written prop types.

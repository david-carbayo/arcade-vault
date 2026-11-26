# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Arcade Vault is an online platform for playing games and competing for the highest score. It is at the very start: the code is still the Create Next App scaffold (`app/layout.tsx`, `app/page.tsx`, `app/globals.css`).

Work follows Spec Driven Development with the `/spec` and `/spec-impl` skills from [Klerith/fernando-skills](https://github.com/Klerith/fernando-skills) (`npx skills@latest add Klerith/fernando-skills`). Write a spec first, then implement from it; follow the practices that repo recommends.

## Commands

```bash
npm run dev     # dev server (Turbopack), http://localhost:3000
npm run build   # production build; also type-checks
npm run start   # serve the production build
npm run lint    # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit  # type-check only
```

There is no test runner set up yet.

## Stack and configuration

- Next.js 16.4 (App Router, `app/`), React 19.3, TypeScript strict. Path alias `@/*` maps to the repo root.
- Read the version-matched docs in `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`) before using any Next.js API; do not rely on memory.
- `next.config.ts` turns on `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`. With Cache Components, data fetching and caching follow the `"use cache"` / Suspense model, so check the docs before adding dynamic data or route config.
- Tailwind CSS v4 is wired through the `@tailwindcss/turbopack` loader in `next.config.ts` (there is no PostCSS config). Theme tokens live in `app/globals.css` under `@theme inline`, with light/dark values set as CSS variables on `:root`.
- Route props use the generated global types (e.g. `LayoutProps<"/">`, `PageProps<"/…">`) rather than hand-written prop types.

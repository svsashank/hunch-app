# Hunch — make the call

Gamified stock-picking PWA for independent women investors in India. v1: virtual capital against real-market (demo) prices. Core mechanic: **thesis-before-buy** — state your reasoning, size with soft guardrails, get a verdict (*Called it / Right for the wrong reason / Missed it*) when the call resolves.

## Run
Static host the three files (or `npx serve .`). Installs as a PWA. No build step, no dependencies.

## Structure
- `index.html` — entire app: design system, data, state, views
- `manifest.webmanifest`, `sw.js` — PWA install + offline shell

## Key adapter points
- `PriceFeed` (in `index.html`) — demo seeded random walk. Swap `advance()`/price lookup for a live NSE quote source; everything downstream is agnostic.
- `SIZE_BANDS` — open sizing parameter: conviction → suggested % of goal budget (low 5–10%, med 10–18%, high 18–25%).
- Storage: `window.storage` (Claude artifact runtime) → `localStorage` → memory fallback.

## Deliberate v1 scope (per PRD)
- Virtual currency only; broker execution (Kite/Groww/Upstox) is v2 — confirm screen already resurfaces the thesis for that.
- Thesis private-by-default; verdict sharing opt-in, post-resolution only.
- Guardrails advisory, never blocking. No XP/badges. Editorial register.
- "day N · advance" control simulates market days for testing verdicts.

## Deploy
GitHub Pages → Settings → Pages → Source: **Deploy from a branch** → `main` / `/(root)` → Save.

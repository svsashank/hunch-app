# Hunch — make the call

The market as a living field. An educational stock-picking PWA for independent, financially active Indian women, built per the **v1 specification** (July 2026): warm-paper pastel field, two dials (*gather by* / *paint by*), bloom-in-place cards with plain-speech facet decks, the eye gesture, gravity → invitation → hunch composer → conviction sizing → time-boxed verdicts with her own words quoted back.

Paper money only. Every reading describes data; nothing is a recommendation.

## Run
Static-host the three files (or `npx serve .`). Installs as a PWA. No build step, no dependencies.

## Structure
- `index.html` — the entire app: design tokens, seed content, field engine (2D canvas), card/arc UI, verdict engine
- `manifest.webmanifest`, `sw.js` — PWA install + offline shell

## What's real vs demo
- **Universe**: ~240 real NSE names with hand-written identity lines; 31 tier-1 companies carry bespoke facet decks and thread edges in the voice register (stand-in for the §9 agent pipeline)
- **Signals & prices**: deterministic seeded walks standing in for the daily EOD pipeline (§10). Swap `sig()` / `price()` / `indexLevel()` for the real feed; everything downstream is agnostic
- **Day advance**: a quiet demo control in *yours* simulates market days so verdicts can be experienced

## Spec anchors (locked)
Field as sole architecture (no feed, no tabs, no lists) · two dials · zoom disclosure ladder · descriptive-never-imperative register · companies as "she" · the eye as the single gesture · thesis-before-position · sizing as honesty (2–3 / ~5 / 8–10% bands, 15% cap, felt guardrail) · verdicts: called it / missed it / right-for-the-wrong-reason (third state reserved for the research agent) · local-first storage, serializable for migration.

## Open redlines (tunable in code)
`inviteEligible()` thresholds (§5) · `BANDS` + cap (§7) · verdict thresholds in `resolve()` (§8) · notch labels (§7).

## Deploy
GitHub Pages → Settings → Pages → Deploy from branch → `main` / root.

# CLAUDE.md — Zoey (theory)

The theory app: reading pitch and rhythm, note names and keys, the ear
(intervals, chords, scales), scales on the page and keyboard, and the Learn
tab of reference pages (staff, rhythm, intervals, scale explorer, degrees,
vocabulary). Blue accent (#4DB2FF dark / #1F5FC8 light); the mark is three
throwing knives. Dev server port 5175, test preview port 4175.

## The workspace (read this first)

Honmoon (the engine) and the three apps built on it, Mira, Rumi and Zoey,
are four separate repos. They are developed side by side in one npm
workspace: a parent folder, not in any repo, whose `package.json` lists
them and holds the one shared install:

```
<workspace>/            not a git repo — the local glue
  package.json          "workspaces": the projects below
  package-lock.json     the ONE lock file
  node_modules/         the ONE shared install
  huntrix/              a plain folder, no package.json
    honmoon/            the engine, @greenblacksky/honmoon
    mira/  rumi/  zoey/
```

- `@greenblacksky/honmoon` is linked to `../honmoon`, and its `package.json` points
  straight at the TypeScript/Svelte source in `src/lib`. There is no build
  or release step between engine and apps: an engine edit shows up in a
  running app at once. Apps depend on it by range (`"^0.4.0"`); a breaking
  engine change means bumping `honmoon`'s version and the ranges together.
- Everything on the phone comes from an app's `dist/` (`npm run build`),
  with the engine compiled in. The workspace only matters for development.
- Install only from the workspace root: `npm install` there. Never run
  `npm install` inside a project (it would create a stray lock file and a
  local `node_modules` that shadows the shared one).
- Every project pins the same tool versions (exact versions in each
  `package.json`). An upgrade is done in all of them at once, then
  everything is tested: `npm test` from the workspace root.
- Each project is its own git repo; the workspace and `huntrix/` are not.
- Outside the workspace (on GitHub, for example) the apps install the
  published package instead: see `honmoon/docs/PUBLISHING.md`.
- Machine-specific and personal notes live in the workspace's own
  CLAUDE.md, outside the repos. Keep this file free of them.

## Environment and tools

- Node 22. Editor settings (`.vscode/`) are git-ignored and machine-specific.
- Svelte 5 with runes (`$state`, `$derived`, `$effect`, `$props`); shared
  reactive state lives in `.svelte.ts` modules. TypeScript 6, Vite 8,
  `@sveltejs/vite-plugin-svelte` 7, svelte-check 4. Don't upgrade to
  TypeScript 7 (`@sveltejs/package` needs 6).
- Playwright is pinned to 1.56.1; first run needs
  `npx playwright install chromium`.

## Code style

- **Prettier** formats everything (`.prettierrc.json`: 100 columns, single
  quotes; `prettier-plugin-svelte` for `.svelte`). **ESLint** lints
  (`eslint.config.js`: recommended JS, typescript-eslint and Svelte rules,
  plus `curly: all`, `one-var: never`, `prefer-const`, unused names allowed
  only with a leading `_`). The four projects use identical configs — keep
  them in step.
- Before finishing a change: `npm run format`, `npm run lint` (0 errors),
  `npm run check`.
- The code was ported from a dense single-file original. A first
  readability pass is done across the engine and the apps: spelled-out
  local names, named constants instead of magic numbers, small helper
  functions, no nested ternaries. Short names remain where renaming would
  change the saved format or the public API (`Card.s/c/t/k`, Settings keys,
  shape fields like `s`/`f`/`n`, exports like `lvl`, `ivDef`, `FB`) — those
  are listed under "Code: deep refactors" in `honmoon/docs/ROADMAP.md`.
  Write new code in the spelled-out style; keep the order of random calls
  when refactoring (questions are reproducible with a seeded `Math.random`).
- `no-nested-ternary` is a warning; there are none left — don't add any.
- `public/` (icons) is excluded from formatting.

## Project notes

- Target is an Android phone: an installable PWA, later Firebase Hosting.
  Firebase is deliberately not implemented yet — only a stub.
- Names are a light nod to HUNTR/X from *KPop Demon Hunters*: Honmoon (the
  engine), Mira, Rumi, Zoey. Keep it a reference, not merchandise — no
  character art, no logos, no quotes.

## Commands (in this folder; install happens in the workspace root)

```
npm run dev        dev server with live reload (engine edits included)
npm run check      svelte-check
npm run lint       ESLint (lint:fix fixes what it can)
npm run format     Prettier rewrites the layout of every file
npm test           builds, serves on the preview port, runs Playwright
npm run build      dist/ — the finished PWA
```


## Shape of an app

An app is thin: `src/app.ts` says which drill groups, screens (routes),
tabs, Stats and Setup sections it has, and its storage key;
`src/App.svelte` maps routes to screens inside the engine's `Shell`;
`src/theme.css` sets only the accent colour; `src/mark.ts` is the weapon
drawn beside the name in the header (same drawing as `public/icon.svg`).
Anything another app could use belongs in honmoon, not here.

Icons: `public/icon.svg`, `icon-192.png`, `icon-512.png`,
`icon-maskable-512.png` (no rounded corners) are all rendered from the same
drawing — regenerate the PNGs whenever the SVG changes.

Tests: `tests/helpers.ts` taps like a phone and tolerates buttons that
vanish (auto-advance). Wait ~400 ms after a new question before tapping.

Zoey has no app-specific screens of its own: everything comes from the
engine, including the reference pages (`honmoon/src/lib/ui/screens/` and
`ui/refdata.ts`). `TEMPO_ROWS` in `src/app.ts` drives the rhythm-level
tempo table on Stats.

## Planned next (see docs/ROADMAP.md for the full plan)

Nothing below is built yet; it depends on the engine's path, lesson and
drill work (honmoon/docs/ROADMAP.md).

- The existing reference pages move to the shared lesson format and are
  arranged, with today's drills, into a six-stage path; gentle locking;
  optional placement test (most useful here).
  1. First steps — staff in treble and bass clef, note names, accidentals,
     whole/half/quarter notes and rests, 4/4.
  2. Foundations — ledger lines, eighths, dots, ties, 3/4, half and whole
     steps, building the major scale, easy key signatures, intervals to a fifth.
  3. Keys and intervals — all key signatures, circle of fifths, relative
     minor, all intervals by name and ear, triads, degrees and movable do.
  4. Harmony — diatonic chords and Roman numerals, sevenths, progressions,
     cadences, chord quality by ear.
  5. Rhythm and form — sixteenths, syncopation, triplets, 6/8, song form,
     lead sheets.
  6. Advanced — modes, pentatonic and blues, secondary dominants, borrowed
     chords, alto and tenor clefs, transposition, odd meters.
- New exercises: name the key signature, circle of fifths, chord → Roman
  numeral, triad quality by ear, cadence by ear; knowledge questions per lesson.

## Google backend: Firebase (planned, not started)

Not to be implemented until asked. The design is in
`../honmoon/CLAUDE.md` (and the engine's ROADMAP): one Firebase project for
all three apps, one Hosting site per app serving its `dist/` as an
installable PWA, optional Google sign-in (redirect flow in the installed
app), and progress synced to Firestore at `users/{uid}/apps/zoey` with
offline persistence — everything keeps working without signing in.

Zoey's own share: its Hosting site, its web config passed to the store, and the shared sign-in card in Setup. Rhythm tap calibration and preferences are candidates for the shared user document later.
Deploy config (`firebase.json`, `.firebaserc`) will live in this repo;
`firebase-tools` comes from the workspace (`npx firebase deploy`), not a
global install.


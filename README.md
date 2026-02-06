# Rolvick Partner Portal

Static premium portal built with Next.js App Router, TypeScript, TailwindCSS, and client-side filtering. Optimized for GitHub Pages static export with bilingual EN/RU routes.

## Stack

- Next.js (App Router) + TypeScript (`strict`)
- TailwindCSS
- shadcn-style UI primitives (`src/components/ui`)
- `lucide-react`
- `zod` for client-side contact validation
- `pnpm`

## Routes

EN:

- `/` Home
- `/partners` Partner directory
- `/partners/[slug]` Partner profile (SSG)
- `/cases` Case studies
- `/cases/[slug]` Case study detail (SSG)
- `/contact` Static contact form

RU:

- `/ru` Home
- `/ru/partners`
- `/ru/partners/[slug]`
- `/ru/cases`
- `/ru/cases/[slug]`
- `/ru/contact`

## Data Source

All data is typed and bilingual:

- `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/src/data/types.ts`
- `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/src/data/partners.ts`
- `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/src/data/cases.ts`

UI dictionaries:

- `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/src/i18n/en.ts`
- `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/src/i18n/ru.ts`

### Adding a partner (EN/RU)

1. Add a new entry in `src/data/partners.ts` with bilingual `tagline`, `description`, `packages.name`, `packages.timeline`, `packages.deliverables`.
2. Categories are stored as keys (see `CATEGORY_KEYS` in `src/data/types.ts`) and rendered via dictionaries.

### Adding a case (EN/RU)

1. Add a new entry in `src/data/cases.ts` with bilingual `title`, `summary`, `problem`, `approach`, `outcomes`, `timeline`.
2. Industries are stored as keys (see `INDUSTRY_KEYS` in `src/data/types.ts`) and rendered via dictionaries.

## RU Routing

RU pages are real static routes under `/ru/*`. There is no middleware. Language switcher maps:

- `/path` -> `/ru/path`
- `/ru/path` -> `/path`

GitHub Pages basePath is handled in `next.config.ts` via `BASE_PATH`, so `/ru/*` works under `/Rolvick/ru/*` without manual edits.

## Local Commands

```bash
pnpm dev
pnpm build
pnpm preview
pnpm check:static
```

### Preview with basePath

```bash
BASE_PATH="/repo-name" pnpm build
pnpm preview
```

## Static HTML Checks

`pnpm check:static` validates that exported HTML already contains key partner/case strings:

- `./out/partners/index.html` contains `B5 Research` and `CoreBiz`
- `./out/cases/index.html` contains at least two case titles
- `./out/ru/partners/index.html` contains RU headings
- `./out/ru/cases/index.html` contains RU headings

Script: `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/scripts/assert-static.mjs`

## GitHub Pages Deployment

Workflow: `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/.github/workflows/deploy.yml`

Enable:

1. `Settings` -> `Pages`
2. Source: `GitHub Actions`
3. Push to `main`

### basePath

The workflow computes `BASE_PATH` automatically:

- repo name ends with `.github.io` -> `BASE_PATH=""`
- otherwise -> `BASE_PATH="/<repo-name>"`

No manual edits required.

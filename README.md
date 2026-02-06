# Partner Portal (CoreBiz + B5)

Static premium website built with Next.js App Router, TypeScript, TailwindCSS, shadcn-style UI primitives, and client-side filtering/validation.

## Stack

- Next.js (App Router) + TypeScript (`strict`)
- TailwindCSS
- shadcn-style components (`src/components/ui`)
- `lucide-react`
- `zod` for client-side contact form validation
- `pnpm`

## Routes

- `/` Home
- `/partners` Partner directory with client-side search/filters
- `/partners/[slug]` Partner profile (SSG)
- `/cases` Public case studies with client-side filters
- `/contact` Client-only contact form with Zod validation

## Data Source

Update typed content here:

- `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/src/data/types.ts`
- `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/src/data/partners.ts`
- `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/src/data/cases.ts`

## Local Commands

```bash
pnpm dev
pnpm build
pnpm preview
```

### Preview behavior

`pnpm preview` serves static export from `./out` on `http://localhost:4173`.
If `./out` does not exist, it exits with:

`Run pnpm build first (it generates ./out).`

### Preview with basePath build

```bash
BASE_PATH="/repo-name" pnpm build
pnpm preview
```

## GitHub Pages Deployment

Deployment is configured in:

- `/Users/user/Documents/Documents - User’s MacBook Pro/Projects/Codex/Portal_1/.github/workflows/deploy.yml`

### Enable Pages

1. Open repository `Settings` -> `Pages`.
2. Set `Source` to `GitHub Actions`.
3. Push to `main` (or trigger the workflow manually).

### How basePath is handled

The workflow computes `BASE_PATH` automatically:

- repo name ends with `.github.io` -> `BASE_PATH=""`
- otherwise -> `BASE_PATH="/<repo-name>"`

No manual edits in `next.config.ts` are required.

## Static Export Config

`next.config.ts` includes:

- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`
- `basePath = process.env.BASE_PATH || ""`
- `assetPrefix = basePath ? `${basePath}/` : ""`

`public/.nojekyll` is included so GitHub Pages serves exported files correctly.

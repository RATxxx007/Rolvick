# CoreBiz + B5 Partner Portal (MVP)

Premium partner portal for CoreBiz + B5 with public catalog, intake routing, partner console, and admin moderation.

## Stack
- Next.js App Router + TypeScript
- TailwindCSS + shadcn-inspired UI
- PostgreSQL + Prisma
- NextAuth (credentials) + bcrypt
- Zod validation
- Vitest + React Testing Library

## Local setup

```bash
pnpm install
```

Create a `.env` file with:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/partner_portal"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev_secret_please_change_32_chars_minimum___"
SEED_ADMIN_EMAIL="admin@portal.local"
SEED_ADMIN_PASSWORD="Admin123!"
```

Run migrations, seed, and start:

```bash
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

Run tests:

```bash
pnpm test
```

## Accounts
- Admin: `admin@portal.local` / `Admin123!`
- Partner sample users: `partner.b5@portal.local`, `partner.corebiz@portal.local`, `partner.secureops@portal.local` / `Partner123!`

## Routes
- Public: `/`, `/partners`, `/partners/[slug]`, `/request`, `/become-a-partner`
- Auth: `/login`, `/logout`
- Partner app: `/app`, `/app/profile`, `/app/cases`, `/app/intros`
- Admin: `/admin`, `/admin/partners`, `/admin/requests`, `/admin/requests/[id]`, `/admin/intros`, `/admin/commissions`

## Phase 2 ideas
- Advanced partner scoring and SLA analytics
- Multi-role approvals and compliance workflows
- Automated intro follow-ups and reporting dashboards
- Deal-level commission tracking with invoices

# Next.js 14 (App Router) — Project Reference

This repo is a **Next.js 14** App Router frontend using **React 18.2**, **TypeScript**, **Tailwind**, **Ant Design**, **TanStack React Query**, and **React Hook Form + Zod**.

Use this document as the project-specific reference (not a generic Next.js encyclopedia).

## Versions & toolchain

- Node: `20.19.0` (see `.nvmrc`)
- Next.js: `14.2.x`
- React: `18.2.0`
- Package manager: Yarn

## Commands

- Dev: `yarn dev`
- Build: `yarn build`
- Start: `yarn start`
- Type check: `yarn type-check`
- Lint: `yarn lint`
- Format: `yarn format`

## Routing structure (App Router)

Routes live under `src/app/`.

- `src/app/(public)/*`: public pages (login, marketing)
- `src/app/(user)/*`: authenticated user area
- `src/app/(admin)/*`: authenticated admin area

Route groups in parentheses **do not affect the URL**, only the filesystem structure.

## Layouts & role-based access

Role-based gating is implemented with `ProtectedRoute`:

- `src/app/(admin)/layout.tsx`: `allowedRoles={["admin"]}`
- `src/app/(user)/layout.tsx`: `allowedRoles={["user", "admin"]}`

Rule: **Admin can access user routes**, but **user cannot access admin routes**.

## Server vs Client components (critical)

- Files are **Server Components by default** in App Router.
- Add `"use client"` at the top when you need hooks like `useState`, `useEffect`, `useRouter`, or browser-only APIs.

Important constraint:

- Server components/layouts must NOT import client-only hooks through barrel exports.
- For auth types/constants used in server code, use `src/domains/auth/server.ts` (server-safe exports).

## API routes (Route Handlers)

Route handlers live under `src/app/api/**/route.ts`.

- Auth:
  - `src/app/api/auth/login/route.ts`
  - `src/app/api/auth/logout/route.ts`
- Admin APIs:
  - `src/app/api/admin/companies/route.ts`
  - `src/app/api/admin/companies/[id]/route.ts`

Authorization for admin APIs is enforced server-side by checking cookies.

## Authentication model (mock)

This repo uses a simple cookie-based mock auth for UI development.

Cookies:

- `auth-token`: presence indicates logged in
- `auth-role`: `"admin" | "user"`

Login UI provides two buttons to simulate roles.

## Data fetching (React Query)

- Query config: `src/lib/query/config.ts`
- Centralized keys: `src/lib/query/keys.ts`
- Domain hooks: `src/domains/*/hooks/*`

Rule: do not hardcode query keys; always use `queryKeys.*` factories.

## HTTP client

Axios instance and interceptors:

- `src/lib/http/axios.ts`

Rule: keep HTTP concerns in `src/lib/http/` and server-state concerns in `src/lib/query/`.

## Forms & validation

- Zod schemas: `src/domains/*/schemas.ts`
- TypeScript types: `src/domains/*/types.ts`
- React Hook Form uses `zodResolver(schema)`.

Rule: do not mix Zod schemas into `types.ts`.

## Styling

- Tailwind global styles: `src/app/globals.css`
- Ant Design theme/constants: `src/constants/theme.ts`

## Gotchas

- Next 14 config should be `next.config.js` (this repo uses JS config).
- If you see weird type errors after dependency upgrades, delete `.next/` and retry `yarn build`.
- Avoid importing `@/domains/auth` from server components if it re-exports client hooks; prefer `@/domains/auth/server`.

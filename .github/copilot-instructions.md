# Copilot Instructions — Next.js 14 Frontend Application

## Architecture Overview

**Domain-Driven Structure**: Next.js 14 App Router application with React 18.2, TypeScript, Tailwind CSS, Ant Design, React Query, and React Hook Form + Zod validation. Code organized by business domains (auth, user, admin, public).

**Data Flow**: Frontend (port 3000) → API calls via React Query hooks → External API endpoints. State managed by React Query for server state and Zustand for client state (cross-cutting concerns).

**Authentication**: Token-based auth. Tokens stored in cookies via js-cookie, sent via Axios Authorization interceptor in `lib/http/`.

## Critical Patterns

### 1. Domain-Driven File Organization

```
domains/
├── auth/          # Authentication domain
│   ├── hooks/     # useLogin, useLogout
│   ├── schemas.ts # Zod validation schemas
│   ├── types.ts   # TypeScript types
│   └── index.ts   # Barrel export
├── user/          # User domain
├── admin/         # Admin domain
└── public/        # Public domain
```

**Why**: Reduces coupling, co-locates related code, scales better than feature-less folder structure.

### 2. React Query with Centralized Keys

```typescript
// lib/query/keys.ts - Centralized query key factory
export const queryKeys = {
  admin: {
    companies: {
      all: () => ['admin', 'companies'] as const,
      detail: (id: string) => ['admin', 'companies', 'detail', id] as const,
    },
  },
}

// domains/admin/hooks/useGetCompanies.ts
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/http'
import { queryKeys } from '@/lib/query'

export const useGetCompanies = () => {
  return useQuery({
    queryKey: queryKeys.admin.companies.all(),
    queryFn: async () => {
      const { data } = await axiosInstance.get('/companies')
      return data
    },
  })
}
```

**Why**: Centralized keys prevent typos, enable type-safe invalidation, easier refactoring.

### 3. Form Validation with React Hook Form + Zod

```typescript
// domains/admin/schemas.ts - Validation only
import { z } from 'zod'

export const createCompanySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  website: z.string().url().optional(),
})

export type CreateCompanyFormData = z.infer<typeof createCompanySchema>

// In component
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCompanySchema, useCreateCompany } from '@/domains/admin'

const form = useForm({
  resolver: zodResolver(createCompanySchema),
})
```

**Pattern**: schemas.ts for Zod validation, types.ts for TypeScript types. Never mix validation with types.

### 4. HTTP Layer Separation

```typescript
// lib/http/axios.ts - Axios instance with interceptors
import axios from 'axios'
import Cookies from 'js-cookie'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('auth-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

**Convention**: lib/http/ for HTTP concerns, lib/query/ for React Query config.

### 5. Route Groups by Role

```
app/
├── (public)/      # Login, landing pages
├── (user)/        # Dashboard, user features
└── (admin)/       # Admin features (companies, etc.)
    └── layout.tsx # Admin-specific layout with ProtectedRoute
```

**Why**: Clear separation of concerns, easier to apply middleware/layouts by role.

## Development Workflow

### Initial Setup

```bash
nvm use           # Switch to Node 20+ (reads .nvmrc)
yarn install      # Install dependencies (uses Yarn)
```

### Daily Development

```bash
yarn dev          # Start Next.js dev server (port 3000)
yarn format       # Auto-format with Prettier
yarn lint         # ESLint check
```

### Build & Production

```bash
yarn build        # Build production bundle
yarn start        # Start production server
```

## Project-Specific Conventions

1. **Domain Structure**: Group hooks, schemas, types by business domain in `domains/`
2. **Validation vs Types**: `schemas.ts` for Zod (runtime), `types.ts` for TypeScript (compile-time)
3. **Query Keys**: Use centralized factory in `lib/query/keys.ts`
4. **HTTP Layer**: `lib/http/` for Axios, `lib/query/` for React Query config
5. **Route Groups**: (public), (user), (admin) in `app/`
6. **Imports**: Use barrel exports (`@/domains/auth` not `@/domains/auth/hooks/useLogin`)
7. **Component Naming**: PascalCase for components, camelCase for hooks

## Server vs Client Imports (Important)

- Server Components (layouts, route handlers) must NOT import client hooks (anything using `useRouter`, `useEffect`, etc.).
- For constants/types/schemas used in server code, prefer `@/domains/*/server`.

## Key Integration Points

- **HTTP Client**: `lib/http/axios.ts` — Axios instance with auth interceptor
- **Query Client**: `lib/query/config.ts` — React Query configuration
- **Query Keys**: `lib/query/keys.ts` — Centralized query key factory
- **Providers**: `app/providers.tsx` — QueryClientProvider setup
- **Domains**: `domains/*/` — Business logic grouped by domain

## Testing Strategy

- **Unit Tests**: Test utilities, hooks, helpers in `__tests__/`
- **Component Tests**: React Testing Library for UI components
- **Integration Tests**: React Query hooks with MSW for API mocking
- **Domain Tests**: Test each domain's hooks, schemas, types together

## Common Gotchas

1. **Import from Domains**: Always use `@/domains/auth` not `@/hooks/api/auth` (old structure)
2. **Schemas vs Types**: Don't put Zod schemas in types.ts or vice versa
3. **Query Keys**: Always use `queryKeys.*` factory, never hardcode strings
4. **HTTP vs Query**: `lib/http/` for Axios, `lib/query/` for React Query
5. **Route Groups**: Parentheses in folder names don't affect URL structure
6. **Barrel Exports**: Use `index.ts` in each domain for clean imports

## Reference Files

- Project structure: `README.md`
- Domain examples: `domains/auth/`, `domains/admin/`
- Query keys: `lib/query/keys.ts`
- HTTP setup: `lib/http/axios.ts`

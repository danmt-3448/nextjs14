# Next.js 14 Frontend Application

Modern Next.js 14 (App Router) application with TypeScript, TanStack Query, Zustand, and Ant Design.

## 🚀 Tech Stack

- **Framework**: Next.js 14.2.x with App Router
- **React**: React 18.2.0
- **Language**: TypeScript 5
- **UI Library**: Ant Design 5.22.0
- **Styling**: Tailwind CSS 3.4.0
- **State Management**:
  - TanStack Query 5.62.0 (server state)
  - Zustand 4.5.0 (client state)
- **HTTP Client**: Axios 1.7.0
- **Form Handling**: React Hook Form 7.54.0 + Zod 3.23.0
- **Date Library**: dayjs 1.11.13
- **Cookie Management**: js-cookie 3.0.5
- **Code Quality**: Prettier 3.4.0 + ESLint 8.57.0
- **Package Manager**: Yarn

## 📋 Prerequisites

- Node.js 20.19.0 (enforced via `.nvmrc`)
- Yarn package manager

## 🛠️ Installation

```bash
# Use correct Node version
nvm use

# Install dependencies
yarn install
```

## 🏃 Development

```bash
# Start development server (http://localhost:3000)
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Lint code
yarn lint

# Format code
yarn format
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (public)/          # Public routes (login, home)
│   ├── (user)/            # User routes (dashboard, profile, settings...)
│   ├── (admin)/           # Admin routes (companies management)
│   ├── layout.tsx         # Root layout with AntdRegistry
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # React Query provider
│   └── globals.css        # Global styles
├── domains/               # Domain-driven structure
│   ├── auth/             # Authentication domain
│   │   ├── hooks/        # useLogin, useLogout
│   │   ├── schemas.ts    # Zod validation schemas
│   │   ├── types.ts      # TypeScript types
│   │   └── index.ts      # Barrel export
│   ├── user/             # User domain
│   │   ├── hooks/        # useGetMe, useUpdateProfile
│   │   ├── schemas.ts    # Zod validation schemas
│   │   ├── types.ts      # TypeScript types
│   │   └── index.ts      # Barrel export
│   ├── admin/            # Admin domain
│   │   ├── hooks/        # useGetCompanies, useCreateCompany, etc.
│   │   ├── schemas.ts    # Zod validation schemas
│   │   ├── types.ts      # TypeScript types
│   │   └── index.ts      # Barrel export
│   └── public/           # Public domain
│       ├── hooks/        # useGetPosts
│       ├── types.ts      # TypeScript types
│       └── index.ts      # Barrel export
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components (Header, Sidebar, Footer)
│   └── shared/            # Shared components (ErrorBoundary, ProtectedRoute)
├── hooks/
│   └── ui/                # UI utility hooks (useToggle, useDebounce, useAuth)
├── lib/                   # Utilities and configurations
│   ├── http/              # HTTP layer
│   │   ├── axios.ts       # Axios instance with interceptors
│   │   └── index.ts       # HTTP exports
│   ├── query/             # React Query layer
│   │   ├── config.ts      # React Query config
│   │   ├── keys.ts        # Query key factory
│   │   └── index.ts       # Query exports
│   ├── date.ts            # dayjs utilities
│   ├── storage.ts         # localStorage/cookie helpers
│   ├── utils.ts           # General utilities
│   └── file.ts            # File handling utilities
├── store/                 # Zustand stores (cross-cutting concerns)
│   ├── useLoadingStore.ts # Loading state management
│   ├── useNavigationStore.ts # Navigation state
│   └── useUIStore.ts      # UI preferences (persisted)
└── constants/             # Application constants
    ├── common.ts          # Common constants
    ├── endpoint.ts        # API endpoints
    ├── routes.ts          # Route paths
    ├── message.ts         # Error/success messages
    └── theme.ts           # Theme configuration
```

## 🔐 Authentication

- Token stored in cookies via `js-cookie`
- Auto-attached to requests via Axios interceptor
- Protected routes use `ProtectedRoute` wrapper
- 401 responses auto-redirect to login

### Roles & Permissions (Mock)

- Two roles: `admin` and `user` (stored in cookie `auth-role`)
- Admin **can** access user area; user **cannot** access admin area
- Login page provides two buttons: **Login User** and **Login Admin**
- Mock backend rule: only `admin@demo.com` can become `admin`

## 🎨 Styling

- **Tailwind CSS**: Utility-first styling with custom theme
- **Ant Design**: Component library with SSR support via `AntdRegistry`
- **CSS Modules**: Available for component-specific styles

## 📦 State Management

### Server State (TanStack Query)

- Handles all API data fetching, caching, and synchronization
- Centralized query keys in `lib/query/keys.ts`
- Hooks organized by domain in `domains/*/hooks/`
- Example: `useGetCompanies()`, `useLogin()`, `useGetMe()`

### Client State (Zustand)

- `useLoadingStore`: Button loading states
- `useNavigationStore`: Navigation and redirect tracking
- `useUIStore`: Persisted UI preferences (sidebar, theme, language)

## 🛡️ Type Safety

- TypeScript strict mode enabled
- Path alias `@/*` maps to `src/*`
- Zod schemas for runtime validation
- Full type coverage for API responses

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `prettier.config.js` - Code formatting rules
- `.eslintrc.json` - ESLint rules (Next.js compatible)

## 📚 Key Patterns

### Domain Structure

```typescript
// Each domain contains hooks, schemas, types, and store (if needed)
// Example: domains/admin/
domains/admin/
├── hooks/
│   ├── useGetCompanies.ts
│   ├── useCreateCompany.ts
│   └── index.ts
├── schemas.ts    # Zod validation only
├── types.ts      # TypeScript types only
└── index.ts      # Barrel export
```

### API Hook with Query Keys

```typescript
// domains/admin/hooks/useGetCompanies.ts
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/http'
import { queryKeys } from '@/lib/query'
import { API_ENDPOINTS } from '@/constants'

export const useGetCompanies = () => {
  return useQuery({
    queryKey: queryKeys.admin.companies.all(),
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOINTS.GET_COMPANIES)
      return data
    },
  })
}
```

### Form with Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, useLogin } from '@/domains/auth'

const form = useForm({
  resolver: zodResolver(loginSchema),
})

const { mutate: login } = useLogin()
```

### Protected Route

```typescript
import { ProtectedRoute } from '@/components/shared'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Protected content</div>
    </ProtectedRoute>
  )
}
```

## 🌐 Environment Variables

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 📝 Scripts

- `yarn dev` - Start development server
- `yarn build` - Build production bundle
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for all new files
3. Run `yarn format` before committing
4. Ensure `yarn lint` passes
5. Write meaningful commit messages

## 📄 License

Private project - All rights reserved

---

Built with ❤️ using Next.js 14

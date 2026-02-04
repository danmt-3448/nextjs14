# Next.js 14 Frontend Application

This project follows the Next.js 14 App Router pattern with React 18.2, TypeScript, Tailwind CSS, Ant Design, React Query, and React Hook Form + Zod validation.

## Quick Start

```bash
# Switch to correct Node version
nvm use

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit http://localhost:3000

## Architecture

- **Framework**: Next.js 14 with App Router
- **React**: 18.2.0
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Ant Design
- **Data Fetching**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form + Zod validation
- **State**: React Query (server) + Zustand (client, optional)
- **HTTP Client**: Axios
- **Testing**: Vitest/Jest + React Testing Library + Playwright

## Project Structure

```
src/app/                 # Next.js App Router
├── (public)/            # Public routes
├── (user)/              # User routes
├── (admin)/             # Admin routes
├── layout.tsx           # Root layout with AntdRegistry
├── page.tsx             # Home page
└── providers.tsx        # QueryClientProvider setup

components/             # Reusable React components
hooks/                  # Custom hooks (useQuery, useMutation)
lib/                    # Utilities (API client, helpers)
types/                  # TypeScript type definitions
schemas/                # Zod validation schemas
store/                  # Zustand stores (optional)
public/                 # Static assets

__tests__/             # Unit and component tests
e2e/                    # Playwright E2E tests
```

## Key Conventions

1. **Data Fetching**: Use React Query hooks in `hooks/` directory
2. **Forms**: React Hook Form + Zod for validation
3. **Components**: Ant Design for UI, custom components in `components/`
4. **API Client**: Centralized in `lib/api.ts` with auth interceptor
5. **Types**: TypeScript interfaces in `types/` directory
6. **Validation**: Zod schemas in `schemas/` directory

## Available Scripts

```bash
yarn dev          # Start dev server (port 3000)
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn format       # Format with Prettier
yarn type-check   # TypeScript type-check
```

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
# Add other NEXT_PUBLIC_* variables for client-side
```

## Testing

- **Unit Tests**: Vitest for utilities and hooks
- **Component Tests**: React Testing Library
- **Integration Tests**: MSW for API mocking
- **E2E Tests**: Playwright

## Deployment

Recommended: Vercel

```bash
npm run build
# Deploy to Vercel, Netlify, or your preferred platform
```

## Reference

- [Next.js 14 Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Ant Design Docs](https://ant.design/)
- [Zod Docs](https://zod.dev/)

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed patterns and conventions.

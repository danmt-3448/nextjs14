# Prompt Template — Tạo Specification cho Next.js 14 Frontend Application

## Mô tả mục tiêu prompt

Bạn là AI Specs Writer/Copilot và cần sinh ra File ĐẶC TẢ (specification) đầy đủ cho một project Next.js 14 frontend application với TypeScript. Nội dung đặc tả cần mang đủ các mục như dưới đây, match các tiêu chí thực tế triển khai, rõ ràng/đủ chi tiết, tiêu chuẩn hóa cho Dev có thể phát triển, test, và bàn giao.

---

## Hướng dẫn sinh đặc tả

### 1. Giới thiệu & Mục tiêu dự án

- Tên dự án
- Mục tiêu/ngữ cảnh
- Nêu rõ phạm vi tối thiểu (MVP) và hạn chế (constraints), công nghệ đề xuất.

### 2. Stack công nghệ (bắt buộc nêu rõ cho Frontend)

- **Frontend**: Next.js 14, React 18.2, TypeScript, Tailwind CSS, Ant Design
- **Data Fetching**: React Query (`@tanstack/react-query`) hoặc SWR
- **Forms**: React Hook Form + Zod validation + `@hookform/resolvers`
- **State Management**: React Query (server state) + Zustand (client state, optional)
- **HTTP Client**: Axios hoặc fetch API
- **Package Manager**: npm, pnpm, hoặc yarn
- **Code Quality**: Prettier, ESLint, TypeScript strict mode
- **Node Version**: Node.js 20+ (enforced via .nvmrc)
- **Testing**: Vitest/Jest (unit), React Testing Library, Playwright (E2E), MSW (API mocking)
- **Deployment**: Vercel (recommended), Netlify, hoặc Docker

### 3. Đối tượng sử dụng & Vai trò

- Phân biệt rõ Guest/User vs Admin (nếu có)
- Bảng quyền, đặc điểm thao tác, tính năng liên quan

### 4. Đặc tả chức năng — Giao diện (Frontend)

- List các route, nêu rõ path, mô tả, các component chính
- Note hành vi UI đặc biệt (client state, validation, accessibility, caching...)
- Ant Design components được sử dụng (`Button`, `Form`, `Table`, `Modal`, etc.)

### 5. Đặc tả API Integration

- Liệt kê các external API endpoints cần tích hợp
- Cho method, path, request/response mẫu JSON khi cần
- Mô tả chi tiết từng trường, validation (Zod schemas), error handling
- **Authentication**: Token-based (JWT) nếu cần, stored in localStorage/cookies
- **React Query**: Query keys, cache configuration, optimistic updates

### 6. Data Types & Validation

- TypeScript interfaces cho API responses
- Zod schemas cho form validation
- Type safety strategy (strict mode, type inference)

### 7. Luồng nghiệp vụ chính

- **Authentication Flow** (nếu có):
  - Login/logout với token management
  - Protected routes với auth guards
- **Data Fetching Flow**:
  - React Query queries với cache strategies
  - Mutations với optimistic updates
- **Form Submission Flow**:
  - Zod validation
  - Error handling và success feedback

### 8. Test & Acceptance Criteria

- **Unit Tests**: Vitest/Jest cho utilities, hooks, helper functions
- **Component Tests**: React Testing Library cho UI components
- **Integration Tests**: React Query hooks với MSW cho API mocking
- **E2E Tests**: Playwright cho user flows
- **Form Validation Tests**: Test Zod schemas riêng
- Acceptance checklist tối thiểu khi demo

### 9. Security & Deploy Notes

- **Environment Variables**:
  - Frontend: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_*` cho client-side
- **Authentication**: Token storage best practices
- **CORS**: Configured trên API backend
- **Deployment**:
  - Vercel: Automatic với Git integration
  - Docker: Multi-stage builds với node:20-alpine
  - Environment variables configuration

### 10. Development Workflow & Scripts

- **Setup**: `nvm use` → `yarn install`
- **Development**: `yarn dev` (port 3000)
- **Code Quality**: `yarn lint`, `yarn format` (Prettier)
- **Testing**: `yarn test` (nếu có), `yarn test:e2e` (nếu có)
- **Build**: `yarn build`, `yarn start`

### 11. Roadmap/Kế hoạch triển khai

- **Sprint 1**: Project setup, basic pages, routing structure
- **Sprint 2**: API integration với React Query, authentication
- **Sprint 3**: Main features implementation với forms
- **Sprint 4**: Testing (unit + E2E), polish UI/UX
- **Sprint 5**: Deployment preparation, optimization
- Milestone kiểm thử sau mỗi sprint

### 12. Phụ lục:

- **API Documentation**: External API endpoints documentation
- **Environment Variables**: Template `.env.example` file
- **Project Structure**: Folder layout trong `README.md`
- **CI/CD**: GitHub Actions workflow trong `.github/workflows/`
- **Code Quality Config**:
  - `.prettierrc` và `.prettierignore`
  - `tsconfig.json` với strict mode
  - ESLint config trong `.eslintrc.json`
- **Node Version**: `.nvmrc` file

---

## Template ví dụ (Tùy chỉnh theo project thực tế)

### Quick Start Checklist for Specs:

1. ✅ Define tech stack (Next.js 14, React 18.2, React Query, Ant Design, TypeScript, Tailwind)
2. ✅ List all pages/routes với components
3. ✅ List all external API endpoints cần integrate
4. ✅ Define TypeScript types cho API responses
5. ✅ Define authentication flow (nếu cần)
6. ✅ Specify state management (React Query + Zustand optional)
7. ✅ Plan testing strategy (Vitest + Playwright + MSW)
8. ✅ Document deployment (Vercel hoặc Docker)
9. ✅ Create acceptance criteria per feature
10. ✅ Break down into sprints/tasks

---

**Áp dụng khi gọi AI sinh đặc tả specs cho các project Next.js 14 frontend-only, TypeScript, với React Query, Ant Design, và modern tooling.**

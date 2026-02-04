```chatagent
# Chatmode: Implementation — Next.js 14 Frontend

## Mục tiêu Chatmode

Chế độ này hướng dẫn triển khai feature/module theo workflow thực thi nhanh, có kiểm chứng và có test sau khi chạy được.

Workflow bắt buộc:
1) Đọc spec
2) Viết code
3) Chạy code
4) Viết test
5) Chạy test
6) Chạy lại code

Áp dụng cho: page, component, hook, API integration, form, utils.

---

## Workflow chuẩn (Đọc spec → Viết code → Chạy code → Viết test → Chạy test → Chạy lại code)

1. **Đọc spec / yêu cầu**
   - Tóm tắt acceptance criteria.
   - Xác định role/permission (User/Admin) và routes liên quan.
   - Xác định phạm vi file sẽ sửa (pages/hooks/components/api routes).

2. **Viết code (implementation trước)**
   - Ưu tiên theo convention của dự án:
     - Logic theo domain trong `src/domains/*`
     - Query keys trong `src/lib/query/keys.ts`
     - HTTP trong `src/lib/http/*`
   - Tránh over-engineer: implement tối thiểu để chạy được.

3. **Chạy code để verify nhanh**
   - `yarn dev` (UI flow) hoặc `yarn build` (compile/build check) tuỳ phạm vi.
   - Fix lỗi runtime/TypeScript nếu có.

4. **Viết test (sau khi code chạy)**
   - Viết test map với acceptance criteria.
   - Ưu tiên unit/integration test cho hooks/utils; component test cho UI.
   - Nếu cần mock API: dùng MSW.

5. **Chạy test**
   - Chạy test suite liên quan (unit/component/integration).
   - Fix flakiness và đảm bảo deterministic.

6. **Chạy lại code (final sanity)**
   - Chạy lại `yarn dev`/`yarn build` để chắc không regression.

---

## Input mong muốn

- Link/đoạn spec (hoặc mô tả feature).
- Role/routing expected.
- Nếu có file/module cụ thể cần sửa thì nêu rõ.

---

## Output mong muốn

- Danh sách file thay đổi và lý do.
- Lệnh chạy (dev/build/test).
- Test cases đã viết và phạm vi cover.

---

## Lưu ý

- Với server components/layouts/route handlers: tránh import client hooks (vd `useRouter`).
- Với constants/types dùng trong server code: ưu tiên import từ `src/domains/*/server`.

```

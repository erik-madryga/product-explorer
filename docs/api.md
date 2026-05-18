# API Reference

All API routes live under `src/app/api` and use Next.js App Router route handlers with `NextResponse`.
They prefer a blob-backed persistence layer (via `src/lib/blobClient.ts`) and fall back to the bundled mocked data (`src/lib/mockedData.json`) when the blob backend is unavailable.

## Endpoints

- `GET  /api/products`
  - Returns an array of products. Uses blob `products/all.json` when available; otherwise returns `mockedData.products`.

- `POST /api/products`
  - Create/update product. Request body must include an `id`. Writes product via `updateProduct`.

- `GET  /api/products/[id]`
  - Return a single product by id. Responds `404` if not found.

- `PUT  /api/products/[id]`
  - Update product data for `id`.

- `DELETE /api/products/[id]`
  - Delete a product from the blob store.

- `GET  /api/users`
  - Returns all users (blob fallback to `mockedData.users`).

- `POST /api/users`
  - Create/update a user. Request body must include an `id`.

- `GET  /api/users/[userId]`
  - Return a single user by id.

- `PUT  /api/users/[userId]`
  - Update a user file and also updates `users/all.json` in the blob store.

- `DELETE /api/users/[userId]`
  - Delete a user file.

- `GET  /api/carts/[userId]`
  - Return the cart for a user (stored at `carts/<userId>.json`). Returns `404` if not found.

- `PUT  /api/carts/[userId]`
  - Update a user's cart.

- `DELETE /api/carts/[userId]`
  - Delete a user's cart.

- `POST /api/auth/signup`
  - Create a new user account. Validates required fields (`username`, `password`, `email`), enforces unique username, generates a new numeric `id`, writes the individual user file and updates `users/all.json`.

- `POST /api/init`
  - Seed the blob store with the bundled `mockedData` (writes users and products into the blob and creates the `all.json` files).

## Notes
- Implementation files: see `src/app/api` (examples: `src/app/api/products/route.ts`, `src/app/api/users/[userId]/route.ts`, `src/app/api/init/route.ts`).
- All handlers catch errors and fall back to mocked data where appropriate to keep the local developer experience frictionless.

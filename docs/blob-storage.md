# Blob Storage / Persistence (optional)

This project includes optional blob-backed persistence implemented with `@vercel/blob`. The blob helpers live in `src/lib/blobClient.ts`.

Key helpers

- `writeToBlob(key, data)` — writes JSON to the given key (`put`).
- `readFromBlob(key)` — reads and parses JSON from the given key (`get`). Returns `null` if missing.
- `deleteFromBlob(key)` — deletes an object (`del`).

Convenience functions

- Users: `getUser`, `getAllUsers`, `updateUser`, `deleteUser` → keys under `users/` (individual files and `users/all.json`).
- Products: `getProduct`, `getAllProducts`, `updateProduct`, `deleteProduct` → keys under `products/` and `products/all.json`.
- Carts: `getCart`, `updateCart`, `deleteCart` → keys under `carts/<userId>.json`.

Key formats

- `users/<id>.json`
- `users/all.json`
- `products/<id>.json`
- `products/all.json`
- `carts/<userId>.json`

Seeding the blob store

1. Configure credentials for your chosen provider supported by `@vercel/blob` (see dependency in `package.json`).
2. Start the dev server (`yarn dev`).
3. POST to the init route to seed mocked data:

```bash
curl -X POST http://localhost:3000/api/init
```

Notes

- If the blob client is not configured or an operation fails, the API routes fall back to the bundled `src/lib/mockedData.json` so the app still runs locally.
- `blobClient` converts streams to text when reading and stringifies objects when writing — data is stored as JSON.

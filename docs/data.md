# Mocked Data

Source: `src/lib/mockedData.json` — used as the local fallback and as a seed for the optional blob store.

Top-level structure

- `users`: Array of user objects. Each user contains `id`, `username`, `password`, `email`, `phone`, `name`, `address` (with `geolocation`), and `__v`.
- `products`: Array of product objects. Each product contains `id`, `title`, `price`, `description`, `category`, `image`, and `rating` (`rate` and `count`).
- `carts`: Array of cart objects. Each cart contains `id`, `userId`, `date`, `products` (array of `{productId, quantity}`), and `__v`.

Usage notes

- On the server (during SSR or route handlers) the app falls back to these arrays if the blob store is empty or not configured.
- `src/lib/fakeStoreApi.ts` contains the client/server abstraction which prefers client-side API routes and falls back to `mockedData.json` server-side.

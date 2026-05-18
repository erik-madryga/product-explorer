# Client Stores (Zustand)

Location: `src/store`

This app uses small, focused Zustand stores for client-side state:

- `productStore.ts` — `useProductStore`
  - Fields: `search`, `filters`, `sort`, `products`, `isSignedIn?`
  - Actions: `setProducts`, `setSearch`, `setFilters`, `setSort`, `fetchAllProducts` (calls `src/lib/fakeStoreApi.fetchProducts`).

- `cartStore.ts` — `useCartStore`
  - Fields: `cart`, `loading`, `error`
  - Actions: `fetchUserCart(userId)`, `setCart`, `clearCart`, `addItemToCart`, `updateItemQuantity`, `removeItemFromCart`.

- `userStore.ts` — `useUserStore`
  - Fields: `user`, `loading`, `error`
  - Actions: `setUser`, `clearUsers`

Notes

- Stores are intentionally minimal and focused on in-component usage rather than providing a global heavy state layer.
- Network reads are done via `src/lib/fakeStoreApi.ts` so stores stay decoupled from the persistence implementation.

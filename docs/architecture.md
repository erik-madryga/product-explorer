# Architecture & Design Notes

High-level overview of the app structure and design decisions.

Stack

- Next.js (App Router) with React + TypeScript.
- Tailwind CSS + CoreUI for styling and UI primitives.
- Zustand for lightweight client-side state.
- Optional persistence via `@vercel/blob`.

Patterns

- Server vs Client components: Pages and data-loading use server components for initial render; interactive UI (modals, cart, add-to-cart) are client components.
- Layered data access: `src/lib/fakeStoreApi.ts` is the runtime abstraction used by UI code — it prefers client-side API routes but falls back to `mockedData.json` on the server so local development requires no external services.
- API routes: small, focused handlers live under `src/app/api`. When persistence is enabled the routes read/write JSON blobs; otherwise they return mocked data to maintain a frictionless dev experience.

Extensibility

- Swap persistence: the `blobClient` API is a thin wrapper so replacing `@vercel/blob` with another provider or a simple DB adapter is straightforward.
- Testing: the small stores and stateless component nature make unit testing and integration tests easy to add (suggested: Vitest + React Testing Library).

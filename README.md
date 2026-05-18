# Product Explorer

[![Visit App](https://img.shields.io/badge/Visit%20App-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://product-explorer-mu-eight.vercel.app/)

A modern, developer-friendly e-commerce demo showcasing a polished product catalog, search, sign-in flow, cart management and a lightweight server-backed API.

This repository highlights full-stack Next.js App Router patterns, server components, progressive enhancement, and a clean component library.

<table>
  <tr>
    <td>
      <img width="1020" height="722" alt="Screenshot 2026-05-17 at 5 56 16 AM" src="https://github.com/user-attachments/assets/22c2f5e7-79b5-463e-9156-1171ab3ebd21" />
    </td>
  </tr>
</table>


## Quick Snapshot

- **Framework:** Next.js (App Router)
- **Language:** TypeScript + React
- **Styling:** Tailwind CSS + CoreUI components
- **State:** Zustand (client-side stores)
- **Data layer:** local mocked data with optional persistent blob storage via `@vercel/blob`
- **Key UX:** search-as-you-type, accessible product cards, cart flow, sign-in modal


## Highlights / Why this project

- Clear separation of server and client responsibilities using Next.js Server Components.
- Robust local development experience — app runs fully with mocked data out-of-the-box.
- Optional cloud-backed persistence via a blob provider for realistic demos of CRUD flows.
- Focus on accessibility and keyboard support in interactive components.


## Getting started (local development)

Prerequisites

- Node.js (LTS) — Node 18+ recommended.
- Yarn 4.x is used by this project (see `package.json`). If you don't have Yarn 4 installed, enable Corepack and activate the required version:

```bash
corepack enable
corepack prepare yarn@4.12.0 --activate
```

Install dependencies

```bash
yarn install
```

Run the dev server

```bash
yarn dev
# open http://localhost:3000
```

Build for production

```bash
yarn build
yarn start
```

Lint

```bash
yarn lint
```

Notes

- No environment variables are required to run the app locally: the UI and API routes fall back to the bundled mocked data in `src/lib/mockedData.json` when a persistent blob backend is not configured.
- If you want to test the persistent backend, configure credentials for your blob provider (the app uses `@vercel/blob`) and then seed the store (see the next section).


## Seed / initialize the persistent backend (optional)

If you configure a blob provider and want to populate it with the demo data, start the dev server and POST to the init API:

```bash
curl -X POST http://localhost:3000/api/init
```

This route writes the bundled mock users/products into the blob backend. If credential/configuration for the blob provider is missing, the request may fail — the app will still run using local mock data.

See `src/lib/blobClient.ts` and `src/app/api/init/route.ts` for implementation details.


## Project structure (short)

- `src/app` — Next.js App Router pages and API routes.
- `src/components` — React UI components (Product cards, Cart, Header, SignIn modal).
- `src/lib` — client/server libraries: `blobClient.ts`, `fakeStoreApi.ts`, and `mockedData.json`.
- `src/store` — small Zustand stores for cart and user state.
- `src/styles` — Tailwind/global styles.

Key files to inspect:

- `src/app/page.tsx` — homepage server component that loads initial products.
- `src/lib/fakeStoreApi.ts` — runtime abstraction that prefers API routes in the browser but falls back to `mockedData.json` on the server.
- `src/lib/blobClient.ts` — blob read/write helpers used by API routes for persistence.


## Architecture & design notes

- The app uses Next.js App Router with server components for initial data fetches and client components for interactive features (cart, modals).
- Data access is intentionally layered: UI reads from browser API routes when possible; server-side rendering uses mock data to keep the developer experience frictionless.
- Zustand provides a lightweight client-side state store for cart and user session data — easy to reason about and test.
- The blob-backed API routes demonstrate a simple persisted CRUD model; swapping the blob provider for another persistence layer is straightforward.


## Extending the project / ideas

- Add unit and integration tests (React Testing Library + Jest or Vitest).
- Add CI to run `yarn lint` and tests on pull requests.
- Replace the blob backend with a simple SQLite or Postgres adapter for more realistic local development.
- Add end-to-end tests with Playwright or Cypress to showcase flows (search, add-to-cart, checkout mock).


## For interviewers / recruiters

- The code demonstrates server + client component patterns, progressive enhancement, and a small but realistic data layer.
- Look for the `src/lib` utilities for how the app separates concerns between fetch logic and persistence.
- The app is intentionally small but complete: it covers UI, state management, API routes and persistence hooks you can extend in a single session.


## License

This project uses the MIT license. See the `LICENSE` file for details.


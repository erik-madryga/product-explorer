# Components Overview

Location: `src/components` — the app is composed of small, reusable components. Below are the most important files and responsibilities.

- `Header.tsx` — top navigation and global actions (sign-in, cart, theme toggle).
- `SearchBar.tsx` — search input with incremental filtering.
- `DarkToggle.tsx` — theme toggle control.
- `SignInModal.tsx` — sign-in / auth modal used for the demo flow.

Product components

- `Product/ProductCard.tsx` — accessible product card with image, title, price and action buttons.
- `Product/ProductPageGrid.tsx` — grid layout for product listing pages.
- `Product/product.types.ts` — product TypeScript types.

Cart components

- `Cart/CartCard.tsx` — cart item card used inside the cart view.
- `Cart/CartIcon.tsx` — header cart icon with count badge.
- `Cart/CartPageGrid.tsx` — layout for the cart page.
- `Cart/AddToCartButton.tsx` — encapsulates add-to-cart UX.
- `Cart/cart.types.ts` — cart-related TypeScript types.

User components

- `User/UserCard.tsx` — small user summary card.
- `User/user.types.ts` — user TypeScript types.

Notes

- The components are split into presentational pieces and small hooks/stores for local behavior.
- Prefer looking at component prop types (the `*.types.ts` files) for quick contract understanding.

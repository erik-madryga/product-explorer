"use client";
import Link from "next/link";
import { CartIcon } from "./Cart/CartIcon";
import SearchBar from "./SearchBar";
import { SignInModal } from "./SignInModal";
import { User } from "./User/user.types";
import { useUserStore } from "../store/userStore";

export default function Header({ users }: { users: User[] }) {
  const { user } = useUserStore();
  return (
    <header className="app-header sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <Link href="/" className="text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap">
            Product Explorer
          </Link>
          <div className="flex-1 max-w-3xl">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <SignInModal users={users} />
            <Link href="/carts" className="flex items-center rounded-lg p-2 text-muted transition hover:bg-brand-50 hover:text-brand-700">
              <CartIcon />
              <span className="sr-only">View cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex items-center justify-between gap-2">
          <Link href="/" className="text-sm sm:text-base font-bold tracking-tight whitespace-nowrap flex-1 truncate">
            Product Explorer
          </Link>
          <div className="flex items-center gap-2">
            <SignInModal users={users} />
            <Link href="/carts" className="flex items-center rounded-lg p-2 text-muted transition hover:bg-brand-50 hover:text-brand-700">
              <CartIcon />
              <span className="sr-only">View cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile search bar - full width below */}
        <div className="md:hidden mt-2">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

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
    <header className="border-b-2 py-4 bg-purple-700 text-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Product Explorer
        </Link>
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4 mr-3">
          <SignInModal users={users} />
          
          <Link href={user ? `/carts/${user.id}`: "#"} className="flex items-center p-1 rounded hover:bg-yellow-600/10">
            <CartIcon />
            <span className="sr-only">View cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

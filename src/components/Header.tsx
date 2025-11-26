import Link from "next/link";
import DarkToggle from "./DarkToggle";

export default function Header() {
  return (
    <header className="border-b py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Product Explorer
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/products" className="hidden sm:inline-block">
            Products
          </Link>
          <DarkToggle />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import DarkToggle from "./DarkToggle";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="border-b-2 py-4 bg-purple-700 text-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Product Explorer
        </Link>
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-yellow-500 text-purple-700 px-3 py-1 rounded-md font-medium hover:bg-yellow-400"
          >
            Sign-in
          </button>
        </div>
      </div>
    </header>
  );
}

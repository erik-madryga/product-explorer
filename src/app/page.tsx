import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Product Explorer</h1>
      <p className="text-slate-600">
        A demo e-commerce UI showing search, filters, and product pages.
      </p>
      <Link
        href="/products"
        className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Browse Products
      </Link>
    </div>
  );
}

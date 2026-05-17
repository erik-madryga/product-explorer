import BrowserFakeStoreTest from "./BrowserFakeStoreTest";

type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

const FAKE_STORE_PRODUCTS_URL = "https://fakestoreapi.com/products";

async function fetchFakeStoreProducts() {
  const startedAt = Date.now();
  let status: number | null = null;

  try {
    const response = await fetch(FAKE_STORE_PRODUCTS_URL, {
      cache: "no-store",
    });
    status = response.status;
    const durationMs = Date.now() - startedAt;
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await response.json() : null;

    return {
      ok: response.ok,
      status,
      durationMs,
      products: Array.isArray(data) ? (data as FakeStoreProduct[]) : [],
      error: response.ok ? null : `Expected JSON products, received ${contentType || "unknown content type"}.`,
    };
  } catch (error) {
    return {
      ok: false,
      status,
      durationMs: Date.now() - startedAt,
      products: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default async function FakeStoreTestPage() {
  const result = await fetchFakeStoreProducts();
  const sampleProducts = result.products.slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-4">
        <div>
          <p className="app-section-label">External API test</p>
          <h1 className="mt-2 text-3xl font-bold text-ink">Fake Store API</h1>
        </div>

        <div className="grid gap-3 rounded-lg border border-line bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-muted">Result</p>
            <p className={result.ok ? "font-semibold text-emerald-700" : "font-semibold text-red-700"}>
              {result.ok ? "Connected" : "Failed"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">HTTP status</p>
            <p className="font-semibold text-ink">{result.status ?? "No response"}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Products returned</p>
            <p className="font-semibold text-ink">{result.products.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Duration</p>
            <p className="font-semibold text-ink">{result.durationMs}ms</p>
          </div>
        </div>

        {result.error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {result.error}
          </p>
        ) : null}
      </section>

      <BrowserFakeStoreTest />

      {sampleProducts.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleProducts.map((product) => (
            <article key={product.id} className="app-card flex min-h-72 flex-col p-5">
              <div className="flex h-36 items-center justify-center border-b border-line bg-slate-50 p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col pt-4">
                <h2 className="line-clamp-2 text-base font-semibold text-ink">{product.title}</h2>
                <p className="mt-2 text-sm text-muted">{product.category}</p>
                <p className="mt-auto pt-4 text-xl font-bold text-ink">${product.price}</p>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

type BrowserTestResult = {
  ok: boolean;
  status: number | null;
  durationMs: number | null;
  productCount: number;
  error: string | null;
};

const FAKE_STORE_PRODUCTS_URL = "https://fakestoreapi.com/products";

export default function BrowserFakeStoreTest() {
  const [result, setResult] = useState<BrowserTestResult>({
    ok: false,
    status: null,
    durationMs: null,
    productCount: 0,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function testBrowserFetch() {
      const startedAt = Date.now();

      try {
        const response = await fetch(FAKE_STORE_PRODUCTS_URL);
        const data = await response.json();

        if (!isMounted) return;

        setResult({
          ok: response.ok,
          status: response.status,
          durationMs: Date.now() - startedAt,
          productCount: Array.isArray(data) ? data.length : 0,
          error: null,
        });
      } catch (error) {
        if (!isMounted) return;

        setResult({
          ok: false,
          status: null,
          durationMs: Date.now() - startedAt,
          productCount: 0,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    testBrowserFetch();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-4">
      <div>
        <p className="app-section-label">Browser fetch</p>
        <h2 className="mt-2 text-2xl font-bold text-ink">Client-side request</h2>
      </div>

      <div className="grid gap-3 rounded-lg border border-line bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm text-muted">Result</p>
          <p className={result.ok ? "font-semibold text-emerald-700" : "font-semibold text-red-700"}>
            {isLoading ? "Testing..." : result.ok ? "Connected" : "Failed"}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">HTTP status</p>
          <p className="font-semibold text-ink">{result.status ?? "No response"}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Products returned</p>
          <p className="font-semibold text-ink">{result.productCount}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Duration</p>
          <p className="font-semibold text-ink">
            {result.durationMs === null ? "Pending" : `${result.durationMs}ms`}
          </p>
        </div>
      </div>

      {result.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {result.error}
        </p>
      ) : null}
    </section>
  );
}

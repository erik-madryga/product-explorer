import { getData } from "../../../lib/getData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "100", 10); // Default limit, adjust as needed
  const products = await getData();
  const start = (page - 1) * limit;
  const paginated = products.slice(start, start + limit);
  return new Response(JSON.stringify({
    page,
    limit,
    total: products.length,
    products: paginated
  }), {
    headers: { "Content-Type": "application/json" },
  });
}

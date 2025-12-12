import { getProducts } from "../../../lib/getProducts";

export async function GET() {
  const products = await getProducts();
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

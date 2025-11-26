import products from "@/data/products.json";

export async function GET() {
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

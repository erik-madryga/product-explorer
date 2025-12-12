import { getData } from "../../../lib/getData";

export async function GET() {
  const products = await getData();
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

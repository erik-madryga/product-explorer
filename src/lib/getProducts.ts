import products from "@/data/products.json";

export async function getProducts() {
  // simulate small delay if you like
  return products;
}

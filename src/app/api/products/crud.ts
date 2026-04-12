import { NextResponse } from "next/server";
import { getAllProducts, updateProduct, deleteProduct } from "../../../lib/blobClient";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products || []);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json();
    const productId = productData.id;
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await updateProduct(productId, productData);
    return NextResponse.json(productData);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

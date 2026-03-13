import { NextResponse } from "next/server";
import mockedData from "../../../../lib/mockedData.json";

export async function GET(request: any, { params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = await params;
  console.log("Received userId for cart:", resolvedParams.userId); // Debug log
  const userId = Number(resolvedParams.userId);
  const cart = mockedData.carts.find(c => c.userId === userId);
  if (!cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }
  return NextResponse.json(cart);
}
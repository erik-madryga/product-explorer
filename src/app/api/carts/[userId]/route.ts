import { NextResponse } from "next/server";
import { getCart, updateCart, deleteCart } from "../../../../lib/blobClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const cart = await getCart(userId);
    
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const cartData = await request.json();
    
    const updated = await updateCart(userId, cartData);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    await deleteCart(userId);
    return NextResponse.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json({ error: "Failed to delete cart" }, { status: 500 });
  }
}
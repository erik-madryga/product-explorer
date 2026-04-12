import { NextResponse } from "next/server";
import mockedData from "../../../lib/mockedData.json";
import { updateUser, updateProduct, writeToBlob } from "../../../lib/blobClient";

export async function POST() {
  try {
    // Initialize users
    if (mockedData.users && mockedData.users.length > 0) {
      for (const user of mockedData.users) {
        await updateUser(user.id, user);
      }
      await writeToBlob("users/all.json", mockedData.users);
    }

    // Initialize products
    if (mockedData.products && mockedData.products.length > 0) {
      for (const product of mockedData.products) {
        await updateProduct(product.id, product);
      }
      await writeToBlob("products/all.json", mockedData.products);
    }

    return NextResponse.json({
      message: "Blob initialized successfully",
      users: mockedData.users?.length || 0,
      products: mockedData.products?.length || 0,
    });
  } catch (error) {
    console.error("Error initializing blob:", error);
    return NextResponse.json(
      { error: "Failed to initialize blob", details: error },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getAllUsers, updateUser, deleteUser } from "../../../lib/blobClient";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users || []);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const userId = userData.id;
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await updateUser(userId, userData);
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

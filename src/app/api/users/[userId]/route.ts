import { NextResponse } from "next/server";
import { getUser, updateUser, deleteUser, getAllUsers, writeToBlob } from "../../../../lib/blobClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const user = await getUser(userId);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const userData = await request.json();
    
    // Update individual user file
    await updateUser(userId, userData);
    
    // Also update the users/all.json file
    const allUsers = await getAllUsers();
    if (allUsers) {
      const userIndex = allUsers.findIndex((u: any) => String(u.id) === String(userId));
      if (userIndex !== -1) {
        allUsers[userIndex] = userData;
        await writeToBlob("users/all.json", allUsers);
      }
    }
    
    return NextResponse.json({ user: userData, success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    await deleteUser(userId);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
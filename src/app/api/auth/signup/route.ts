import { NextResponse } from "next/server";
import { updateUser, getAllUsers, writeToBlob } from "../../../../lib/blobClient";
import mockedData from "../../../../lib/mockedData.json";

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const { 
      firstname, 
      lastname, 
      username, 
      password, 
      email,
      phone,
      street,
      number,
      city,
      zipcode,
      lat,
      long,
    } = userData;

    // Validation
    if (!username || !password || !email) {
      return NextResponse.json(
        { error: "Username, password, and email are required" },
        { status: 400 }
      );
    }

    // Get all users to find max ID
    let users = await getAllUsers();
    if (!users || !Array.isArray(users)) {
      users = mockedData.users || [];
    }

    // Check if username already exists
    const existingUser = users.find((u: any) => u.username === username);
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    // Generate new ID
    const maxId = Math.max(...users.map((u: any) => u.id || 0));
    const newUserId = maxId + 1;

    // Create new user
    const newUser = {
      id: newUserId,
      username,
      password,
      email,
      phone: phone || "",
      name: {
        firstname: firstname || "",
        lastname: lastname || "",
      },
      address: {
        street: street || "",
        number: number ? parseInt(number) : 0,
        city: city || "",
        zipcode: zipcode || "",
        geolocation: {
          lat: lat || "0",
          long: long || "0",
        },
      },
      __v: 0,
    };

    // Save individual user
    await updateUser(newUserId, newUser);
    
    // Update the all.json with new user list
    const updatedUsers = [...users, newUser];
    await writeToBlob("users/all.json", updatedUsers);

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user account" },
      { status: 500 }
    );
  }
}

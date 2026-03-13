import { PRODUCTS } from "../constants/strings";
import mockedProductData from "./mockedData.json";

// Fetch products from Fake Store API
export async function fetchProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`;
  const url = `${baseUrl}/api/products`;
  try {
    console.log("Fetching products from:", url);
    const response = await fetch(url);
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Fetched products data:", data);

    // Basic validation: check if data is an array and not empty
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("Invalid or empty products data, using mocked data.");
      return mockedProductData.products;
    }
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return mockedProductData.products;
  }
}

// Fetch users from Fake Store API
export async function fetchUsers(userId?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`;
  const url = userId ? `${baseUrl}/api/users/${userId}` : `${baseUrl}/api/users`
  console.log("Fetching users from URL:", url); // Debug log  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return userId ? mockedProductData.users[0] || [] : mockedProductData.users || [];
  }
}

// Fetch cart from Fake Store API
export async function fetchCart(userId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`;
  const url = `${baseUrl}/api/carts/${userId}`
  // const url = `www.fakestoreapi.com/carts`;
  console.log("Fetching cart from URL:", url); // Debug log
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return mockedProductData.carts[0] || [];
  }
}

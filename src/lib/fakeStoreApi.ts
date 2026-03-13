import { PRODUCTS } from "../constants/strings";
import mockedProductData from "./mockedData.json";

// Fetch products from Fake Store API
export async function fetchProducts() {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "";
  const url = `${baseUrl}/api/products`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetch users from Fake Store API
export async function fetchUsers(userId?: string) {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "";
  const url = userId ? `${baseUrl}/api/users/${userId}` : `${baseUrl}/api/users`;
  console.log("Fetching users from URL:", url); // Debug log  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return mockedProductData.users || [];
  }
}

// Fetch cart from Fake Store API
export async function fetchCart(userId: string) {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "";
  const url = `${baseUrl}/api/carts/${userId}`;
  // const url = `www.fakestoreapi.com/carts`;
  console.log("Fetching cart from URL:", url); // Debug log
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return mockedProductData.carts || [];
  }
}

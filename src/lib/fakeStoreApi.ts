import { PRODUCTS } from "../constants/strings";
import mockedProductData from "./mockedData.json";

// Fetch products from Fake Store API
export async function fetchProducts() {
  const url = "https://fakestoreapi.com/" + PRODUCTS;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return mockedProductData.products;
  }
}

// Fetch users from Fake Store API
export async function fetchUsers() {
  const url = "https://fakestoreapi.com/users";
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
  const url = `https://fakestoreapi.com/carts/user/${userId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return mockedProductData.cart || [];
  }
}

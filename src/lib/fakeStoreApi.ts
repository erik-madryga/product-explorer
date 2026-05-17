import mockedProductData from "./mockedData.json";

function getClientApiUrl(path: string) {
  return typeof window === "undefined" ? null : path;
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error(`Expected JSON response, received ${contentType || "unknown content type"}`);
  }

  return response.json();
}

// Fetch products from the app API in the browser, or local fallback data on the server.
export async function fetchProducts() {
  const url = getClientApiUrl("/api/products");

  if (!url) {
    return mockedProductData.products;
  }

  try {
    const data = await fetchJson(url);

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

// Fetch users from the app API in the browser, or local fallback data on the server.
export async function fetchUsers(userId?: string) {
  const fallbackUser = userId
    ? mockedProductData.users.find((u) => u.id === Number(userId)) || mockedProductData.users[0]
    : mockedProductData.users || [];
  const url = getClientApiUrl(userId ? `/api/users/${userId}` : "/api/users");

  if (!url) {
    return fallbackUser;
  }

  try {
    return await fetchJson(url);
  } catch (error) {
    console.error(error);
    return fallbackUser;
  }
}

// Fetch cart from the app API in the browser, or local fallback data on the server.
export async function fetchCart(userId: string) {
  const url = getClientApiUrl(`/api/carts/${userId}`);

  if (!url) {
    return mockedProductData.carts[0] || [];
  }

  try {
    return await fetchJson(url);
  } catch (error) {
    console.error(error);
    return mockedProductData.carts[0] || [];
  }
}

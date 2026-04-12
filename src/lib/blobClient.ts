import { put, get, del } from '@vercel/blob';

// Generic Blob operations
export async function writeToBlob(key: string, data: any) {
  try {
    await put(key, JSON.stringify(data), {
      access: 'private',
      allowOverwrite: true,
    });
    return data;
  } catch (error) {
    console.error(`Error writing to blob [${key}]:`, error);
    throw error;
  }
}

export async function readFromBlob(key: string) {
  try {
    const response = await get(key, {
      access: 'private',
    });
    if (!response || !response.stream) return null;
    
    // Convert stream to text
    const reader = response.stream.getReader();
    const decoder = new TextDecoder();
    let text = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
    
    return JSON.parse(text || '{}');
  } catch (error) {
    console.error(`Error reading from blob [${key}]:`, error);
    return null;
  }
}

export async function deleteFromBlob(key: string) {
  try {
    await del(key);
  } catch (error) {
    console.error(`Error deleting blob [${key}]:`, error);
    throw error;
  }
}

// Users
export async function getUser(userId: string | number) {
  return readFromBlob(`users/${userId}.json`);
}

export async function getAllUsers() {
  return readFromBlob(`users/all.json`);
}

export async function updateUser(userId: string | number, userData: any) {
  return writeToBlob(`users/${userId}.json`, userData);
}

export async function deleteUser(userId: string | number) {
  return deleteFromBlob(`users/${userId}.json`);
}

// Products
export async function getProduct(productId: string | number) {
  return readFromBlob(`products/${productId}.json`);
}

export async function getAllProducts() {
  return readFromBlob(`products/all.json`);
}

export async function updateProduct(productId: string | number, productData: any) {
  return writeToBlob(`products/${productId}.json`, productData);
}

export async function deleteProduct(productId: string | number) {
  return deleteFromBlob(`products/${productId}.json`);
}

// Carts
export async function getCart(userId: string | number) {
  return readFromBlob(`carts/${userId}.json`);
}

export async function updateCart(userId: string | number, cartData: any) {
  return writeToBlob(`carts/${userId}.json`, cartData);
}

export async function deleteCart(userId: string | number) {
  return deleteFromBlob(`carts/${userId}.json`);
}

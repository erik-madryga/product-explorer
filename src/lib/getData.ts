import { PRODUCTS } from "../constants/strings";
import mockedProductData from "./mockedData.json"
export async function getData(param?: string) {
  // If you want to use the real API, uncomment the code below and comment out the mocked data return statement.
  const url = "https://fakestoreapi.com/"+ (param ? param : PRODUCTS);
  console.log("Fetching data from URL:", url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return mockedProductData.products;
    } else {
      console.error(error);
      return mockedProductData.products;
    }
  }
  // return mockedProductData[param as keyof typeof mockedProductData];
}

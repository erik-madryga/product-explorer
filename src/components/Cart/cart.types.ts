export interface Cart {
  id: number
  userId: number | string
  date: string
  products: { productId: number; quantity: number }[]
  __v: number
}
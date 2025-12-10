export interface ProductProps {
  product: Product
}

export interface Product {
  id: string
  title: string
  price: number
  image: string
  rating: number
  category: string
  description: string
  popularity: number
};

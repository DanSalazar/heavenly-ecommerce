export interface Product {
  id: number
  name: string
  brand: string | null
  description: string | null
  price: number
  discount: boolean | null
  percentage_off: number | null
  image: string
  color: string
  sizes: string
  department: 'men' | 'women'
  category: string
}

export interface BagItem {
  id: string
  productId: number
  quantity: number
  createdAt: Date
}

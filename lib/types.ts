export interface Product {
  id: number
  name: string
  brand?: string
  description: string
  price: number
  discount?: boolean
  percentage_off?: number
  image: string
  color: string
  sizes: string
  department: 'Men' | 'Women'
  category: string
}
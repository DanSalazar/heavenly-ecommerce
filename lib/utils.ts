import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BagItem } from '@/db/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const centsToPrice = (amount: number): number => {
  return Math.round(amount / 100)
}

type BreadcrumbType = {
  href: string
  title: string
  id: string
}

export const createPathObject = (pathname: string): BreadcrumbType[] => {
  const paths = pathname.split('/')
  const result: BreadcrumbType[] = []
  let href = ''

  for (let i = 0; i < paths.length; i++) {
    const item = paths[i]

    const id = `item-${i}`

    if (item === '') {
      result.push({ title: 'home', href: '/', id })
      continue
    }

    href += `/${item}`

    result.push({
      title: item,
      href,
      id
    })
  }

  return result
}

export const formatPrice = (price: number) => {
  return price.toLocaleString('en', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export const getDiscountPrice = (price: number, discount: number) => {
  const discountPrice = price * (discount / 100)

  return price - discountPrice
}

export const reduceBagPrice = (bag: BagItem[]) => {
  return bag.reduce((acc, bag_item) => {
    if (!bag_item.product_variant.product) return acc + 0
    const {
      product_variant: { product }
    } = bag_item

    let price = product.price
    const quantity = Number(bag_item.quantity)

    const discount = product.discount
    const percentage_off = product.percentage_off || 0

    price = discount ? getDiscountPrice(price, percentage_off) : price

    return acc + quantity * price
  }, 0)
}

export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}

import { BagWithProduct } from '@/db/schema'

export type BreadcumbPath = {
  name: string
  href: string
}

export const createPathObject = (pathname: string): BreadcumbPath[] => {
  const paths = pathname.split('/')
  const result = []
  let href = ''

  for (let item of paths) {
    if (item === '') {
      result.push({ name: 'home', href: '/' })
      continue
    }
    href += `/${item}`
    result.push({ name: item, href })
  }

  return result
}

export const formattedPrice = (price: number) => {
  return price.toLocaleString('en', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export const getDiscountPrice = (price: number, discount: number) => {
  const discountPrice = price - (price * discount) / 100

  return formattedPrice(discountPrice)
}

export const reduceBagPrice = (bag: BagWithProduct[]) => {
  return bag.reduce((acc, bag_item) => {
    if (!bag_item.product_variant) return acc + 0
    const { product_variant } = bag_item

    const price = product_variant.product ? product_variant.product.price : 0
    const quantity = Number(bag_item.quantity)

    return acc + quantity * price
  }, 0)
}

function getFromLocalStorage<T>(key: string): T | null {
  const item = window.localStorage.getItem(key)
  return item ? (JSON.parse(item) as T) : null
}

function setToLocalStorage<T>(key: string, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const saveItemInLocal = (id: string) => {
  const items = getFromLocalStorage<string[]>('items_saved') || []
  const index = items?.findIndex(item_id => item_id === id)

  if (typeof index === 'number' && index !== -1) {
    items.splice(index, 1)
  } else {
    items.push(id)
  }

  setToLocalStorage<string[]>('items_saved', items)
}

export const getItemsFromLocal = (): string[] => {
  return getFromLocalStorage<string[]>('items_saved') || []
}

export const isInFavorites = (id: string) => {
  const favorites = getItemsFromLocal()
  return Boolean(favorites.find(val => val === id))
}

import { BagItem } from '@/db/types'

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
    if (!bag_item.product_variant) return acc + 0
    const { product_variant } = bag_item

    let price = product_variant.product ? product_variant.product.price : 0
    const quantity = Number(bag_item.quantity)

    const discount = bag_item.product_variant.product?.discount
    const percentage_off = bag_item.product_variant.product?.percentage_off || 0

    price = discount ? getDiscountPrice(price, percentage_off) : price

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

export const removeItemFromLocal = (id: string) => {
  const items = getFromLocalStorage<string[]>('items_saved') || []
  const index = items.findIndex(item_id => item_id === id)

  if (index !== -1) {
    items.splice(index, 1)
    setToLocalStorage<string[]>('items_saved', items)
  }
}

export const getItemsFromLocal = (): string[] => {
  return getFromLocalStorage<string[]>('items_saved') || []
}

export const isInFavorites = (id: string) => {
  const favorites = getItemsFromLocal()
  return Boolean(favorites.find(val => val === id))
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

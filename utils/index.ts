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

export const getDiscountPrice = (price: number, discount: number) => {
  const discountPrice = price - (price * discount) / 100

  return discountPrice.toLocaleString('en', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

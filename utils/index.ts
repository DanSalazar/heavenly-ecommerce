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

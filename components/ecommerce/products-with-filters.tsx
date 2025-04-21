import ProductsWrapper from './products-wrapper'
import ProductComponent from './product-component'
import Filters from '../filter/filters'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import {
  getAllProducts,
  getFilters,
  getProductsByDepartment,
  getProductsByQuery
} from '@/data/products'
import { NoProductsAvailable, NoSearchResults } from './no-products'

export default async function ProductsWithFilters({
  department = '',
  query = {}
}: {
  department?: string
  query: Record<string, string>
}) {
  const page = query?.page ? Number(query.page) : 0
  const offset = page > 0 ? (page - 1) * PRODUCTS_PER_PAGE : 0

  const products =
    Object.keys(query).length > 0
      ? await getProductsByQuery({
          query: query,
          department,
          offset,
          limit: PRODUCTS_PER_PAGE
        })
      : department
        ? await getProductsByDepartment({
            department,
            offset,
            limit: PRODUCTS_PER_PAGE
          })
        : await getAllProducts({
            query,
            offset,
            limit: PRODUCTS_PER_PAGE
          })

  if (!products.length && query.q) {
    return <NoSearchResults />
  }

  if (!products.length)
    return (
      <>
        <Filters />
        <NoProductsAvailable />
      </>
    )

  const productsWithinPriceRange =
    query.price_from || query.price_to
      ? products.filter(({ product }) => {
          const price = product.price / 100
          const price_from = Number(query.price_from)
          const price_to = Number(query.price_to)

          return (
            (price_from ? price >= price_from : true) &&
            (price_to ? price <= price_to : true)
          )
        })
      : products

  if (!productsWithinPriceRange.length) {
    return (
      <>
        <Filters />
        <NoProductsAvailable />
      </>
    )
  }

  const ids = productsWithinPriceRange.map(({ product }) => product.id)
  const filters = await getFilters(ids)

  return (
    <>
      <Filters filters={filters} />
      <ProductsWrapper>
        {productsWithinPriceRange.map(product => (
          <ProductComponent
            key={product.product.id}
            product={product.product}
          />
        ))}
      </ProductsWrapper>
    </>
  )
}

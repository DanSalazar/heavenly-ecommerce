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
      <div className="h-[400px] flex items-center justify-center">
        <h2 className="text-5xl font-semibold">
          There are not products to show
        </h2>
      </div>
    )

  const productsWithinPriceRange =
    query.price_from || query.price_to
      ? products.filter(({ product }) => {
          const price = product.price
          const price_from = Number(query.price_from)
          const price_to = Number(query.price_to)

          return (
            (price_from ? price >= price_from : true) &&
            (price_to ? price <= price_to : true)
          )
        })
      : products

  if (!productsWithinPriceRange.length) {
    return <NoProductsAvailable />
  }

  const ids = products.map(({ product }) => product.id)

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

function NoProductsAvailable() {
  return (
    <div className="min-h-[400px] flex items-center justify-center flex-col gap-2">
      <h2 className="text-2xl text-5xl font-semibold">
        There are not products to show
      </h2>
      <p>
        It seems we don&apos;t have any products available right now. Please
        consider exploring other departments or check back later for new
        arrivals.
      </p>
    </div>
  )
}

function NoSearchResults() {
  return (
    <div className="min-h-[400px] flex items-center justify-center flex-col gap-2">
      <h2 className="text-2xl md:text-5xl font-bold">
        No products matched your search
      </h2>
      <p>
        We couldn&apos;t find any products matching your search criteria. Please
        check your spelling, try using broader terms, or explore our popular
        categories for more options.
      </p>
    </div>
  )
}

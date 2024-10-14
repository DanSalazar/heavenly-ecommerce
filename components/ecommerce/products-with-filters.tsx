import ProductsWrapper from './products-wrapper'
import ProductComponent from './product-component'
import Filters from '../filter/filters'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import {
  getFilters,
  getProductsByDepartment,
  getProductsByQuery
} from '@/data/products'

export default async function ProductsWithFilters({
  department = '',
  searchParams = {}
}: {
  department?: string
  searchParams: Record<string, string>
}) {
  const page = searchParams?.page ? Number(searchParams.page) : 0
  const offset = page > 0 ? (page - 1) * PRODUCTS_PER_PAGE : 0

  const products =
    Object.keys(searchParams).length > 0
      ? await getProductsByQuery({
          query: searchParams,
          department,
          offset,
          limit: PRODUCTS_PER_PAGE
        })
      : await getProductsByDepartment({
          department,
          offset,
          limit: PRODUCTS_PER_PAGE
        })

  if (!products)
    return (
      <div className="h-[400px] flex items-center justify-center">
        <h2 className="text-5xl font-semibold">Department not exist</h2>
      </div>
    )

  const ids = products.map(({ product }) => product.id)

  const filters = await getFilters(ids)

  const productsWithinPriceRange =
    searchParams.price_from || searchParams.price_to
      ? products.filter(({ product }) => {
          const price = product.price
          const price_from = Number(searchParams.price_from)
          const price_to = Number(searchParams.price_to)

          return (
            (price_from ? price >= price_from : true) &&
            (price_to ? price <= price_to : true)
          )
        })
      : products

  return (
    <>
      <Filters filters={filters} />
      <ProductsWrapper
        className={
          !productsWithinPriceRange.length
            ? 'flex flex-col items-center text-center justify-center gap-2'
            : ''
        }>
        {productsWithinPriceRange.length
          ? productsWithinPriceRange.map(product => (
              <ProductComponent
                key={product.product.id}
                product={product.product}
              />
            ))
          : !searchParams.q && <NoProductsAvailable />}

        {/* For search page */}
        {searchParams?.q && !productsWithinPriceRange.length && (
          <NoSearchResults />
        )}
      </ProductsWrapper>
    </>
  )
}

function NoProductsAvailable() {
  return (
    <>
      <p className="text-3xl">Oops! No Products Found in This Department</p>
      <p>
        It seems we don&apos;t have any products available right now. Please
        consider exploring other departments or check back later for new
        arrivals.
      </p>
    </>
  )
}

function NoSearchResults() {
  return (
    <>
      <p className="text-3xl">No products matched your search</p>
      <p>
        We couldn&apos;t find any products matching your search criteria. Please
        check your spelling, try using broader terms, or explore our popular
        categories for more options.
      </p>
    </>
  )
}

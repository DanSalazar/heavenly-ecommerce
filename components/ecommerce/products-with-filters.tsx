import {
  getFilters,
  getProductBySearchParams,
  getProductsByDepartment
} from '@/server/actions'
import ProductsWrapper from './products-wrapper'
import ProductComponent from './product-component'
import Filters from '../filter/filters'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'

export default async function ProductsWithFilters({
  department = '',
  searchParams
}: {
  department?: string
  searchParams?: any
}) {
  const offset = searchParams?.page
    ? Number(searchParams?.page - 1) * PRODUCTS_PER_PAGE
    : 0
  const products =
    Object.keys(searchParams).length > 0
      ? await getProductBySearchParams({
          department,
          searchParams,
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
          : !searchParams.q && (
              <>
                <p className="text-2xl font-semibold md:text-4xl">
                  NO PRODUCTS AVAILABLE FOR THIS DEPARTMENT
                </p>
                <p>Try searching for other departments</p>
              </>
            )}

        {/* For search page */}
        {searchParams?.q && !productsWithinPriceRange.length && (
          <>
            <p className="text-3xl md:text-4xl text-center font-semibold">
              NOTHING MATCHES YOUR SEARCH
            </p>
            <p>
              But don't give up – check the spelling or try less specific search
              terms.
            </p>
          </>
        )}
      </ProductsWrapper>
    </>
  )
}

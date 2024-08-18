import {
  getFilters,
  getProductBySearchParams,
  getProductsByDepartment
} from '@/server/actions'
import ProductsWrapper from './products-wrapper'
import ProductComponent from './product-component'
import Filters from '../filter/filters'

export default async function ProductsWithFilters({
  department,
  searchParams
}: {
  department: string
  searchParams?: any
}) {
  const products =
    Object.keys(searchParams).length > 0
      ? await getProductBySearchParams({ department, searchParams })
      : await getProductsByDepartment(department)

  if (!products)
    return (
      <div className="h-[400px] flex items-center justify-center">
        <h2 className="text-5xl font-semibold">Department not exist</h2>
      </div>
    )

  const ids = products.map(({ product }) => product.id)
  const filters = await getFilters(ids)

  const priceRange =
    searchParams.price && searchParams.price.split('-').map(Number)
  const proudctsWithinPriceRange = priceRange
    ? products.filter(({ product: { price } }) => {
        return price >= priceRange[0] && price <= priceRange[1]
      })
    : products

  return (
    <>
      <Filters filters={filters} />
      <ProductsWrapper
        className={
          !proudctsWithinPriceRange.length
            ? 'flex flex-col items-center text-center justify-center gap-2'
            : ''
        }>
        {proudctsWithinPriceRange.length
          ? proudctsWithinPriceRange.map(product => (
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
        {searchParams?.q && !proudctsWithinPriceRange.length && (
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

import { getProducts, getProductsByDepartment } from '@/server/actions'
import ProductsWrapper from './products-wrapper'
import ProductComponent from './product-component'

export default async function Products({
  department,
  searchParams
}: {
  department?: string
  searchParams?: any
}) {
  const products = await getProductsByDepartment(department)

  if (!products)
    return (
      <div className="h-[400px] flex items-center justify-center">
        <h2 className="text-5xl font-semibold">Department not exist</h2>
      </div>
    )

  return (
    <ProductsWrapper
      className={
        !products.length
          ? 'flex flex-col items-center text-center justify-center gap-2'
          : ''
      }>
      {products.length
        ? products.map(({ product }) => (
            <ProductComponent key={product.id} product={product} />
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
      {searchParams?.q && !products.length && (
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
  )
}

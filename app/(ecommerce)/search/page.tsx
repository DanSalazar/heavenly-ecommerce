import ProductComponent from '@/components/ecommerce/product-component'
import ProductsWrapper from '@/components/ecommerce/products-wrapper'
import { ProductPageSkeleton } from '@/components/skeletons'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import { getProducts } from '@/server/actions'
import { Suspense } from 'react'

export default async function Page({
  searchParams
}: {
  searchParams: { search: string }
}) {
  const products = await getProducts(undefined, searchParams)
  const pathname = searchParams?.search
    ? `/search/${searchParams?.search}`
    : `/search`

  return (
    <>
      <BreadcrumbWrapper pathname={pathname} />
      <main className="mt-8 flex flex-col gap-4">
        {products.length ? (
          <>
            <Suspense fallback={<ProductPageSkeleton />}>
              <ProductsWrapper>
                {products.map(item => (
                  <ProductComponent
                    key={item.product.id}
                    product={item.product}
                  />
                ))}
              </ProductsWrapper>
            </Suspense>
          </>
        ) : (
          <h2 className="font-medium text-center">
            There are no products that match "{searchParams?.search}"
          </h2>
        )}
      </main>
    </>
  )
}

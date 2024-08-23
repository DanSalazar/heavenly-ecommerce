import { Suspense } from 'react'
import Product from '@/components/ecommerce/product'
import {
  ProductPageSkeleton,
  ProductsWrapperSkeleton
} from '@/components/skeletons'
import RelatedProducts from '@/components/ecommerce/related-products'

export default async function Page({
  params
}: {
  params: { department: string; id: string }
}) {
  return (
    <>
      <main className="min-h-[600px] flex flex-col md:grid grid-cols-2 gap-4 md:gap-12 mt-4 mb-12">
        <Suspense fallback={<ProductPageSkeleton />}>
          <Product id={params.id} />
        </Suspense>
      </main>
      <Suspense fallback={<ProductsWrapperSkeleton />}>
        <RelatedProducts />
      </Suspense>
    </>
  )
}

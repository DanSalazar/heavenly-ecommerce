import { Suspense } from 'react'
import {
  ProductPageSkeleton,
  ProductsWrapperSkeleton
} from '@/components/skeletons'
import RelatedProducts from '@/components/ecommerce/related-products'
import ProductDetail from '@/components/ecommerce/product-detail'

export default async function Page({
  params
}: {
  params: { department: string; id: string }
}) {
  return (
    <>
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductDetail id={params.id} />
      </Suspense>
      <Suspense fallback={<ProductsWrapperSkeleton />}>
        <RelatedProducts />
      </Suspense>
    </>
  )
}

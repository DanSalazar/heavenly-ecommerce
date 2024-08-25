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
      <Suspense fallback={<ProductPageSkeleton />}>
        <Product id={params.id} />
      </Suspense>
      <Suspense fallback={<ProductsWrapperSkeleton />}>
        <RelatedProducts />
      </Suspense>
    </>
  )
}

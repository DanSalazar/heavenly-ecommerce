import { Suspense } from 'react'
import { ProductPageSkeleton } from '@/components/skeletons'
import ProductDetail from '@/components/ecommerce/product-detail'

export default async function Page({
  params
}: {
  params: { department: string; id: string }
}) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductDetail id={params.id} />
    </Suspense>
  )
}

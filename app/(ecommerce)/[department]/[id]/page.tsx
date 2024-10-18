import ProductDetail from '@/components/ecommerce/product-detail'
import { getFullProduct } from '@/data/products'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductPageSkeleton } from '@/components/skeletons'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getFullProduct(params.id)

  if (!product) return notFound()

  return {
    title: product.name,
    description: product.description
  }
}

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

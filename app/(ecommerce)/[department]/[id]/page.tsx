import ProductDetail from '@/components/ecommerce/product-detail'
import { getFullProduct } from '@/data/products'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductPageSkeleton } from '@/components/skeletons'

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getFullProduct(id)

  if (!product) return notFound()

  return {
    title: product.name,
    description:
      product.description ||
      'This is a great product that meets your needs and expectations.'
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ department: string; id: string }>
}) {
  const { id } = await params
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductDetail id={id} />
    </Suspense>
  )
}

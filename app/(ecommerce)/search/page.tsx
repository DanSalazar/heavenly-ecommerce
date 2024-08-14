import ProductsWithFilters from '@/components/ecommerce/products-with-filters'
import { ProductsWithFiltersSkeleton } from '@/components/skeletons'
import { Suspense } from 'react'

export default async function Page({
  searchParams
}: {
  searchParams: { q: string }
}) {
  return (
    <main className="flex flex-col gap-4">
      <Suspense fallback={<ProductsWithFiltersSkeleton />}>
        <ProductsWithFilters searchParams={searchParams} />
      </Suspense>
    </main>
  )
}

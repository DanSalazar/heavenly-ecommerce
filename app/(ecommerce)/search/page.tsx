import Products from '@/components/ecommerce/products'
import ProductFilters from '@/components/filter/product-filters'
import {
  ProductFiltersSkeleton,
  ProductsWrapperSkeleton
} from '@/components/skeletons'
import { Suspense } from 'react'

export default async function Page({
  searchParams
}: {
  searchParams: { q: string }
}) {
  const pathname = searchParams?.q ? `/search/${searchParams?.q}` : `/search`

  return (
    <main className="flex flex-col gap-4">
      <Suspense fallback={<ProductFiltersSkeleton />}>
        <ProductFilters />
      </Suspense>
      <Suspense fallback={<ProductsWrapperSkeleton />}>
        <Products searchParams={searchParams} />
      </Suspense>
    </main>
  )
}

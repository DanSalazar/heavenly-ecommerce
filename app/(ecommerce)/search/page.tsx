import ProductsWithFilters from '@/components/ecommerce/products-with-filters'
import PaginationWrapper from '@/components/pagination-wrapper'
import {
  PaginationSkeleton,
  ProductsWithFiltersSkeleton
} from '@/components/skeletons'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import { Suspense } from 'react'

export default async function Page({
  searchParams
}: {
  searchParams: { q: string }
}) {
  return (
    <main className="flex flex-col gap-4">
      <Suspense key={searchParams.q} fallback={<ProductsWithFiltersSkeleton />}>
        <ProductsWithFilters key={searchParams.q} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<PaginationSkeleton />}>
        <PaginationWrapper
          productsPerPage={PRODUCTS_PER_PAGE}
          searchParams={searchParams}
        />
      </Suspense>
    </main>
  )
}

import ProductsWithFilters from '@/components/ecommerce/products-with-filters'
import PaginationWrapper from '@/components/pagination-wrapper'
import {
  PaginationSkeleton,
  ProductsWithFiltersSkeleton
} from '@/components/skeletons'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import { Suspense } from 'react'

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
}

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ q: string; page: string }>
}) {
  const params = await searchParams
  const paramsLength = Object.keys(params).length
  const currentPage = Number(params.page || 0)

  return (
    <main className="flex flex-col gap-4">
      <Suspense
        key={currentPage + paramsLength + (params.q || '')}
        fallback={<ProductsWithFiltersSkeleton />}>
        <ProductsWithFilters key={params.q} query={params} />
      </Suspense>
      <Suspense fallback={<PaginationSkeleton />}>
        <PaginationWrapper productsPerPage={PRODUCTS_PER_PAGE} query={params} />
      </Suspense>
    </main>
  )
}

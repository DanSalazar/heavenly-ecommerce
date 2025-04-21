import ProductsWithFilters from '@/components/ecommerce/products-with-filters'
import PaginationWrapper from '@/components/pagination-wrapper'
import {
  PaginationSkeleton,
  ProductsWithFiltersSkeleton
} from '@/components/skeletons'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('metadata.search')
  return {
    title: t('title'),
    description: t('description')
  }
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
    <main className="flex flex-col gap-4 mt-4 mb-8">
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

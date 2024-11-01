import ProductsWithFilters from '@/components/ecommerce/products-with-filters'
import {
  PaginationSkeleton,
  ProductsWithFiltersSkeleton
} from '@/components/skeletons'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import { Suspense } from 'react'
import PaginationWrapper from '@/components/pagination-wrapper'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import { capitalizeWord } from '@/lib/utils'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const departments = ['men', 'women']

export function generateMetadata({
  params
}: {
  params: { department: string }
}) {
  return {
    title: capitalizeWord(params.department) + ' Products',
    description: `Explore our exclusive collection of ${capitalizeWord(params.department)} products, carefully curated to meet your style and needs.`
  }
}

export default async function Page({
  params,
  searchParams
}: {
  params: { department: string }
  searchParams: Record<string, string>
}) {
  if (!departments.includes(params.department)) return notFound()
  const page = Number(searchParams.page) || 0
  const paramsLength = Object.keys(searchParams).length + page

  return (
    <>
      <BreadcrumbWrapper />
      <main className="flex flex-col gap-2 mt-12">
        <h2 className="text-7xl md:text-8xl font-medium uppercase break-words">
          {params.department}
        </h2>
        <Suspense key={paramsLength} fallback={<ProductsWithFiltersSkeleton />}>
          <ProductsWithFilters
            department={params.department}
            searchParams={searchParams}
          />
        </Suspense>
        <Suspense fallback={<PaginationSkeleton />}>
          <PaginationWrapper
            productsPerPage={PRODUCTS_PER_PAGE}
            department={params.department}
            searchParams={searchParams}
          />
        </Suspense>
      </main>
    </>
  )
}

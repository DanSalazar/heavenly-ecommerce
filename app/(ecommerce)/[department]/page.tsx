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

const departments = ['men', 'women']

export async function generateMetadata({
  params
}: {
  params: Promise<{ department: string }>
}) {
  const department = (await params).department
  return {
    title: capitalizeWord(department) + ' Products',
    description: `Explore our exclusive collection of ${capitalizeWord(department)} products, carefully curated to meet your style and needs.`
  }
}

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ department: string }>
  searchParams: Promise<Record<string, string>>
}) {
  const query = await searchParams
  const department = (await params).department

  if (!departments.includes(department)) return notFound()

  const page = Number(query.page) || 0
  const paramsLength = Object.keys(query).length + page

  return (
    <>
      <BreadcrumbWrapper />
      <main className="flex flex-col gap-2 mt-12 mb-8">
        <h2 className="text-7xl md:text-8xl font-medium uppercase break-words">
          {department}
        </h2>
        <Suspense key={paramsLength} fallback={<ProductsWithFiltersSkeleton />}>
          <ProductsWithFilters department={department} query={query} />
        </Suspense>
        <Suspense fallback={<PaginationSkeleton />}>
          <PaginationWrapper
            productsPerPage={PRODUCTS_PER_PAGE}
            department={department}
            query={query}
          />
        </Suspense>
      </main>
    </>
  )
}

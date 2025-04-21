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
import DepartmentTitle from './department-title'
import { getTranslations } from 'next-intl/server'

const departments = ['men', 'women']

export async function generateMetadata({
  params
}: {
  params: Promise<{ department: string }>
}) {
  const t = await getTranslations('metadata.department')
  const department = (await params).department
  return {
    title: t('title', { department: capitalizeWord(department) }),
    description: t('description', { department: capitalizeWord(department) })
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
        <DepartmentTitle department={department} />
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

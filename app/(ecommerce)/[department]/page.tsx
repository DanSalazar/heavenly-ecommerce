import ProductsWithFilters from '@/components/ecommerce/products-with-filters'
import { ProductsWithFiltersSkeleton } from '@/components/skeletons'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import { Suspense } from 'react'

export default async function Page({
  params,
  searchParams
}: {
  params: { department: string }
  searchParams: unknown
}) {
  return (
    <>
      <BreadcrumbWrapper />
      <main className="flex flex-col gap-2 mt-12">
        <h2 className="text-7xl md:text-8xl font-medium uppercase break-words">
          {params.department}
        </h2>
        <Suspense fallback={<ProductsWithFiltersSkeleton />}>
          <ProductsWithFilters
            department={params.department}
            searchParams={searchParams}
          />
        </Suspense>
      </main>
    </>
  )
}

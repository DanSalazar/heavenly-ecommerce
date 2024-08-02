import Products from '@/components/ecommerce/products'
import ProductFilters from '@/components/filter/product-filters'
import {
  ProductFiltersSkeleton,
  ProductsWrapperSkeleton
} from '@/components/skeletons'
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
      <main className="flex flex-col gap-4 mt-12">
        <h2 className="text-7xl md:text-8xl font-medium uppercase break-words">
          {params.department}
        </h2>
        <Suspense fallback={<ProductFiltersSkeleton />}>
          <ProductFilters />
        </Suspense>
        <Suspense fallback={<ProductsWrapperSkeleton />}>
          <Products params={params} searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  )
}

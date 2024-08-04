import Products from '@/components/ecommerce/products'
import { ProductsWrapperSkeleton } from '@/components/skeletons'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import { Suspense } from 'react'

export default async function Page({
  searchParams
}: {
  searchParams: { search: string }
}) {
  const pathname = searchParams?.search
    ? `/search/${searchParams?.search}`
    : `/search`

  return (
    <>
      <BreadcrumbWrapper pathname={pathname} />
      <main className="mt-8 flex flex-col gap-4">
        <Suspense fallback={<ProductsWrapperSkeleton />}>
          <Products searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  )
}

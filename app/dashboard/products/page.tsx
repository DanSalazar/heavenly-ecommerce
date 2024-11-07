import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { PlusCircleIcon, PlusIcon } from '@/components/icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import SearchInput from '../_components/search-input'
import FilterByProducts from './_components/filter-by-products'
import { Suspense } from 'react'
import ProductsTableContainer from './_components/products-table-container'
import {
  PaginationSkeleton,
  ProductsTableSkeleton
} from '@/components/skeletons'
import PaginationWrapper from '@/components/pagination-wrapper'
import { PRODUCTS_PER_ROW } from '@/lib/constants'

export const metadata = {
  title: 'Products'
}

export default async function Page({
  searchParams
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const query = await searchParams
  const paramsLength = Object.keys(query).length
  const currentPage = Number(query.page || 0)

  const suspenseKey = currentPage + paramsLength + (query.q || '')

  return (
    <>
      <div className="flex justify-between gap-2 flex-wrap mb-4">
        <SearchInput placeholder="Search product name..." />
        <div className="flex items-center gap-2">
          <FilterByProducts />
          <Link
            href={'/dashboard/products/properties'}
            className={cn(buttonVariants(), 'gap-1')}>
            <PlusIcon />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add New Properties
            </span>
          </Link>
          <Link
            href={'/dashboard/products/new'}
            className={cn(buttonVariants(), 'gap-1')}>
            <PlusCircleIcon />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Link>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense key={suspenseKey} fallback={<ProductsTableSkeleton />}>
            <ProductsTableContainer query={query} />
          </Suspense>
        </CardContent>

        <CardFooter>
          <Suspense key={suspenseKey} fallback={<PaginationSkeleton />}>
            <PaginationWrapper
              productsPerPage={PRODUCTS_PER_ROW}
              query={query}
            />
          </Suspense>
        </CardFooter>
      </Card>
    </>
  )
}

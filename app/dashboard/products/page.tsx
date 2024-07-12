import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getProducts } from '@/server/actions'
import { PlusCircleIcon, PlusIcon } from '@/components/icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ProductsTable from './_components/products-table'
import SearchInput from '../_components/search-input'
import FilterByProducts from './_components/filter-by-products'

export default async function Page({ searchParams }: { searchParams: any }) {
  const products = await getProducts('', searchParams)

  return (
    <>
      <div className="flex justify-between gap-2 flex-wrap">
        <SearchInput placeholder="Search product name..." />
        <div className="flex items-center gap-2">
          <FilterByProducts />
          <Link
            href={'/dashboard/products/new-properties'}
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
          <CardTitle className="text-2xl">Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsTable products={products} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>{products.length}</strong>{' '}
            products
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

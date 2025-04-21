'use client'

import { ArrowLeftIcon } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import { Select, SelectTrigger, SelectValue } from './ui/select'
import { Skeleton } from './ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const ProductsWrapperSkeleton = () => (
  <div className="grid lg:grid-cols-products gap-4 border-t py-4 border-zinc-200">
    {Array(4)
      .fill(null)
      .map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-4 w-32 rounded-xl" />
          <Skeleton className="h-4 w-full rounded-xl" />
          <Skeleton className="h-4 w-24 rounded-xl" />
        </div>
      ))}
  </div>
)

export const ProductsFiltersSkeleton = () => {
  const t = useTranslations('skeletons')
  return (
    <div className="flex">
      <Button>{t('filters')}</Button>

      <div className="ml-auto w-[200px] flex items-center gap-2 text-muted-foreground">
        <span className="text-sm">{t('sortBy')}</span>
        <Select>
          <SelectTrigger className="border-none flex-1 px-0 outline-none text-primary font-medium">
            <SelectValue placeholder={t('relevance')}></SelectValue>
          </SelectTrigger>
        </Select>
      </div>
    </div>
  )
}

export const ProductsWithFiltersSkeleton = () => (
  <>
    <ProductsFiltersSkeleton />
    <ProductsWrapperSkeleton />
  </>
)

export const ProductPageSkeleton = () => (
  <div className="min-h-[600px] flex flex-col md:grid grid-cols-2 gap-4 md:gap-12 mt-4 mb-12">
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-[500px] col-span-2" />
      <Skeleton className="hidden md:block h-[250px]" />
      <Skeleton className="hidden md:block h-[250px]" />
    </div>
    {/* Product Details */}
    <div className="">
      <Skeleton className="h-8 w-3/4 mb-4" /> {/* Title */}
      <Skeleton className="h-6 w-24 mb-4" /> {/* Price */}
      <Skeleton className="h-4 w-full mb-2" /> {/* Description */}
      <Skeleton className="h-4 w-5/6 mb-6" />
      {/* Color */}
      <Skeleton className="h-5 w-16 mb-2" />
      <Skeleton className="h-8 w-20 mb-4" />
      {/* Size */}
      <Skeleton className="h-5 w-16 mb-2" />
      <Skeleton className="h-8 w-20 mb-6" />
      {/* Add to Bag Button */}
      {/* Wishlist Button */}
      <div className="flex h-12 flex-wrap gap-2">
        <Skeleton className="h-full flex-1" />
        <Skeleton className="h-full w-16" />
      </div>
      {/* Payment & Delivery */}
      <Skeleton className="h-6 w-48 mt-6" />
    </div>
  </div>
)

export const BagPageSkeleton = () => {
  const t = useTranslations('skeletons')
  return (
    <div className="mt-12 flex flex-col md:grid md:grid-cols-3 gap-8">
      <div className="col-span-2">
        <header className="mb-8 flex justify-between items-center flex-wrap">
          <h2 className="font-semibold uppercase text-6xl">{t('bag')}</h2>
          <Skeleton className="h-8 w-6 rounded-md" /> {/* Item count */}
        </header>
        <div className="relative flex gap-4  mb-6 h-[400px] border-b border-t border-zinc-200 py-4">
          <Skeleton className="h-full w-52" /> {/* Product image */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-72" /> {/* Product title */}
            <Skeleton className="h-4 w-24" /> {/* Color */}
            <Skeleton className="h-4 w-24" /> {/* Size */}
            <Skeleton className="h-6 w-16" /> {/* Price */}
            <Skeleton className="h-10 w-32" /> {/* Quantity dropdown */}
          </div>
          <Skeleton className="h-6 w-6 absolute bottom-2 right-0" />{' '}
          {/* Remove item icon */}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="border-b border-zinc-200 pb-4">
          <div className="flex py-2 justify-between flex-wrap">
            <p className="font-medium">{t('articles')}</p>
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex py-2 justify-between flex-wrap">
            <p className="font-medium">{t('shipping')}</p>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="flex py-2 justify-between flex-wrap">
          <p className="font-medium capitalize text-xl">{t('total')}</p>
          <Skeleton className="h-6 w-24" /> {/* Total price */}
        </div>
        <Button className="h-12" disabled>
          {t('checkout')}
        </Button>
        {/* PayPal button */}
        <Skeleton className="h-12" />
      </div>
    </div>
  )
}

export const DashboardSkeleton = () => {
  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <Skeleton className="w-72 h-24" />
        <Skeleton className="w-28 h-6" />
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map(item => (
          <Card key={item}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sales chart */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24 mb-2" />

            <Skeleton className="h-4 w-32 mb-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3].map(item => (
                <div key={item} className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const ProductsTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Total Sales</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map(item => (
          <TableRow key={item}>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="h-16 w-16 rounded md" />
              {/* Product image */}
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-24" /> {/* Product name */}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-6 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const OrdersTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden sm:table-cell">Type</TableHead>
          <TableHead className="hidden md:table-cell">Payment Method</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map(item => (
          <TableRow key={item}>
            <TableCell className="space-y-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-72 h-6" />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="w-12 h-6" />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="w-20 h-6" />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="w-24 h-6" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="w-36 h-6" />
            </TableCell>
            <TableCell className="">
              <Skeleton className="w-20 h-6 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const PaginationSkeleton = () => (
  <div className="flex justify-center items-center">
    <Skeleton className="w-[250px] h-10" />
  </div>
)

export const SocialsSkeletons = () => (
  <div className="flex gap-4">
    <Skeleton className="w-5 h-5 rounded-full" />
    <Skeleton className="w-5 h-5 rounded-full" />
    <Skeleton className="w-5 h-5 rounded-full" />
  </div>
)

export const NewProductSkeleton = () => (
  <>
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <Link
        href={'/dashboard/products'}
        className={buttonVariants({
          variant: 'outline',
          size: 'icon'
        })}>
        <ArrowLeftIcon width={18} height={18} />
        <span className="sr-only">Back</span>
      </Link>
      <h1 className="flex-1 text-2xl font-semibold tracking-tight">
        Create a new product
      </h1>
      <div className="hidden md:block md:ml-auto space-x-2">
        <Button variant={'outline'}>Cancel</Button>
        <Button type="submit" disabled={true}>
          Create Product
        </Button>
      </div>
    </div>
    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
        <Skeleton className="h-[500px]" />
        <Skeleton className="h-[300px]" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-[100px]" />
          <Skeleton className="h-[100px]" />
        </div>
      </div>

      <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
        <Skeleton className="h-[150px]" />
        <Skeleton className="h-[150px]" />
        <Skeleton className="h-[350px]" />
      </div>
    </div>
  </>
)

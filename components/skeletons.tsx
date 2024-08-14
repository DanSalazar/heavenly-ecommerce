import { Button } from './ui/button'
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

export const ProductsFiltersSkeleton = () => (
  <div className="flex justify-between">
    <Button className="uppercase">Filters</Button>
    <Select>
      <SelectTrigger className="w-[150px] border-black font-medium">
        <SelectValue placeholder="Sort by"></SelectValue>
      </SelectTrigger>
    </Select>
  </div>
)

export const ProductsWithFiltersSkeleton = () => (
  <>
    <ProductsFiltersSkeleton />
    <ProductsWrapperSkeleton />
  </>
)

export const ProductPageSkeleton = () => (
  <>
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
  </>
)

export const BagPageSkeleton = () => {
  return (
    <div className="mt-12 flex flex-col md:grid md:grid-cols-3 gap-8">
      <div className="col-span-2">
        <header className="mb-8 flex justify-between items-center flex-wrap">
          <h2 className="font-semibold uppercase text-6xl">Bag</h2>
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
        <h2 className="text-4xl font-semibold break-words">Summary</h2>
        <div className="border-b border-zinc-200 pb-4">
          <div className="flex py-2 justify-between flex-wrap">
            <p className="font-medium">Articles</p>
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex py-2 justify-between flex-wrap">
            <p className="font-medium">Shipping</p>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="flex py-2 justify-between flex-wrap">
          <p className="font-medium capitalize text-xl">Total</p>
          <Skeleton className="h-6 w-24" /> {/* Total price */}
        </div>
        <Button className="h-12" disabled>
          Checkout
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
        {[1, 2, 3].map(item => (
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

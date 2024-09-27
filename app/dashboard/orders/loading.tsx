import { OrdersTableSkeleton, PaginationSkeleton } from '@/components/skeletons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import SearchInput from '../_components/search-input'
import FilterByOrders from './_components/filter-by-orders'

export default function Loading() {
  return (
    <>
      <div className="flex gap-2 justify-between mb-4">
        <SearchInput placeholder="Search customer name..." />
        <FilterByOrders />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersTableSkeleton />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <PaginationSkeleton />
        </CardFooter>
      </Card>
    </>
  )
}

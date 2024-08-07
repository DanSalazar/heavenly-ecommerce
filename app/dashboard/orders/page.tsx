import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import OrdersTable from './_components/orders-table'
import SearchInput from '../_components/search-input'
import FilterByOrders from './_components/filter-by-orders'
import { Suspense } from 'react'
import { OrdersTableSkeleton } from '@/components/skeletons'

export default async function Page({
  searchParams
}: {
  searchParams: unknown
}) {
  return (
    <>
      <div className="flex gap-2 justify-between">
        <SearchInput placeholder="Search customer name..." />
        <FilterByOrders />
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="text-2xl">Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<OrdersTableSkeleton />}>
            <OrdersTable searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  )
}

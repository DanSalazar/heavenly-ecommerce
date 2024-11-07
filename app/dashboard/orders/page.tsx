import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import OrdersTable from './_components/orders-table'
import SearchInput from '../_components/search-input'
import FilterByOrders from './_components/filter-by-orders'
import { PRODUCTS_PER_ROW } from '@/lib/constants'
import PaginationComponent from '@/components/pagination'
import { getOrders, getOrdersLength } from '@/data/orders'

export const metadata = {
  title: 'Orders'
}

export default async function Page({
  searchParams
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const query = await searchParams
  const page = query.page ? Number(query.page) : 0
  const offset = page > 0 ? (page - 1) * PRODUCTS_PER_ROW : 0
  const orders = await getOrders({
    limit: PRODUCTS_PER_ROW,
    query,
    offset
  })
  const ordersLength = await getOrdersLength(query)

  return (
    <>
      <div className="flex gap-2 justify-between mb-4">
        <SearchInput placeholder="Search customer name..." />
        <FilterByOrders />
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="text-2xl">Your Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders} />
        </CardContent>
        <CardFooter>
          <PaginationComponent
            productsPerPage={PRODUCTS_PER_ROW}
            productsLength={ordersLength}
          />
        </CardFooter>
      </Card>
    </>
  )
}

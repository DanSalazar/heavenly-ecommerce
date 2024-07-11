import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import OrdersTable from './_components/orders-table'
import SearchCustomer from './_components/search-customer'
import OrderFilterBy from './_components/order-filter-by'
import { getOrders } from '@/server/actions'

export default async function Page({
  searchParams
}: {
  searchParams: unknown
}) {
  const orders = await getOrders(searchParams)

  return (
    <>
      <div className="flex gap-2 justify-between">
        <SearchCustomer />
        <OrderFilterBy />
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="text-2xl">Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders} />
        </CardContent>
      </Card>
    </>
  )
}

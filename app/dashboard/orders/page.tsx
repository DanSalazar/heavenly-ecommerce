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
import { db } from '@/db'

export default async function Page({ searchParams }: { searchParams: any }) {
  const { payment, q } = searchParams

  const ordersLength = (
    await db.query.order.findMany({
      where: (fields, { ilike, eq, and, or }) => {
        const { payment_method, customer_name, customer_email } = fields

        return and(
          payment ? eq(payment_method, payment) : undefined,
          q
            ? or(ilike(customer_name, q + '%'), ilike(customer_email, q + '%'))
            : undefined
        )
      }
    })
  ).length

  const offset = searchParams?.page
    ? Number(searchParams?.page - 1) * PRODUCTS_PER_ROW
    : 0

  const orders = await db.query.order.findMany({
    where: (fields, { ilike, eq, and, or }) => {
      const { payment_method, customer_name, customer_email } = fields

      return and(
        payment ? eq(payment_method, payment) : undefined,
        q
          ? or(ilike(customer_name, q + '%'), ilike(customer_email, q + '%'))
          : undefined
      )
    },
    limit: PRODUCTS_PER_ROW,
    orderBy: ({ order_created_at }, { desc }) => desc(order_created_at),
    offset
  })

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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { ListFilterIcon } from '@/components/icons'
import { db } from '@/db'
import { Button } from '@/components/ui/button'
import OrdersTable from './_components/orders-table'
import SearchCustomer from './_components/search-customer'

export default async function Page({
  searchParams
}: {
  searchParams: { search: string }
}) {
  const orders = searchParams.search
    ? await db.query.order.findMany({
        where: ({ customer_name, customer_email }, { or, ilike }) => {
          return or(
            ilike(customer_name, searchParams.search + '%'),
            ilike(customer_email, searchParams.search + '%')
          )
        }
      })
    : await db.query.order.findMany({})

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 gap-1">
                <ListFilterIcon />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <SearchCustomer />
        </div>
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

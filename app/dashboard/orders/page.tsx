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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { db } from '@/db'
import { Button } from '@/components/ui/button'
import OrdersTable from './_components/orders-table'

export default async function Page() {
  const orders = await db.query.order.findMany({})

  return (
    <>
      <div className="flex justify-between">
        <Tabs defaultValue="week">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month" className="hidden sm:flex">
              Month
            </TabsTrigger>
            <TabsTrigger value="year" className="hidden sm:flex">
              Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
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

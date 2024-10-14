import ChartDashboard from '../_components/chart-dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { CreditCardIcon, DollarSignIcon, PackageIcon } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { OrderType } from '@/db/types'
import { getDashboardStats } from '@/data/dashboard'

export default async function Page() {
  const { productsInStock, orders, totalRevenue } = await getDashboardStats()

  return (
    <>
      <div className="grid md:grid-cols-3 gap-2 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${formatPrice(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products in stock
            </CardTitle>
            <PackageIcon />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{productsInStock}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CreditCardIcon />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <ChartDashboard data={orders} />
        <RecentOrders orders={orders} />
      </div>
    </>
  )
}

function RecentOrders({ orders }: { orders: OrderType[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {orders.slice(0, 6).map(order => {
          const { customer_name, customer_email, total_amount } = order
          const nameSplitted = customer_name.split(' ')

          return (
            <div key={order.id} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatar.png" alt="Avatar" />
                <AvatarFallback>
                  {nameSplitted[0][0] + nameSplitted[1][0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {customer_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {customer_email}
                </p>
              </div>
              <div className="ml-auto font-medium">
                +${formatPrice(total_amount / 100)}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

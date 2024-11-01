import ChartDashboard from '../_components/chart-dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { CreditCardIcon, DollarSignIcon, PackageIcon } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { OrderType } from '@/db/types'
import { getDashboardStats } from '@/data/dashboard'

export default async function Page() {
  const { productsInStock, orders, totalRevenue } = await getDashboardStats()
  const ordersFromToday = orders.filter(({ order_created_at }) => {
    return (
      new Date(order_created_at).toDateString() === new Date().toDateString()
    )
  })
  const totalRevenueFormatted = formatPrice(totalRevenue)

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Your total Revenue</h2>
          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-500 via-blue-400 to-indigo-500 inline-block text-transparent bg-clip-text">
            ${totalRevenueFormatted}
          </span>
        </div>
        <div className="hidden md:block ml-auto text-sm">
          {new Date().toLocaleDateString()}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-0 mb-4">
        <Card className="md:rounded-r-none md:border-r-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders from Today
            </CardTitle>
            <DollarSignIcon />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{ordersFromToday.length}</div>
          </CardContent>
        </Card>
        <Card className="md:rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products in stock
            </CardTitle>
            <PackageIcon />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{productsInStock}</div>
          </CardContent>
        </Card>
        <Card className="md:rounded-l-none md:border-l-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CreditCardIcon />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orders.length}</div>
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
      <CardContent className="grid gap-4">
        {orders.slice(0, 6).map(order => {
          const { customer_name, customer_email, total_amount } = order
          const nameSplitted = customer_name.split(' ')

          return (
            <div key={order.id} className="flex flex-wrap items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatar.png" alt="Avatar" />
                <AvatarFallback>
                  {nameSplitted[0][0] + nameSplitted[1][0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <p className="text-sm font-medium leading-none">
                  {customer_name}
                </p>
                <p className="hidden sm:block text-sm text-muted-foreground">
                  {customer_email}
                </p>
              </div>
              <div className="text-sm ml-auto font-medium">
                +${formatPrice(total_amount / 100)}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

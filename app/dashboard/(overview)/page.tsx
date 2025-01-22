import ChartDashboard from '../_components/chart-dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { CreditCardIcon, DollarSignIcon, PackageIcon } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { OrderType } from '@/db/types'
import { getDashboardStats } from '@/data/dashboard'

export default async function Page() {
  const { productsInStock, orders, totalRevenue, chartData } =
    await getDashboardStats()
  const ordersFromToday = orders.filter(({ order_created_at }) => {
    return (
      new Date(order_created_at).toDateString() === new Date().toDateString()
    )
  })
  const totalRevenueFormatted = formatPrice(totalRevenue)

  return (
    <>
      <div className="flex justify-between mb-4">
        <TotalRevenueDisplay totalRevenue={totalRevenueFormatted} />
        <div className="hidden md:block ml-auto text-sm font-medium">
          {new Date().toLocaleString()}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Card>
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
        <Card>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CreditCardIcon />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <ChartDashboard data={chartData} />
        <RecentSales orders={orders} />
      </div>
    </>
  )
}

function RecentSales({ orders }: { orders: OrderType[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {orders.slice(0, 6).map(order => {
          const { customer_name, customer_email, total_amount } = order
          const nameSplitted = customer_name.split(' ')

          return (
            <div key={order.id} className="flex flex-wrap items-center gap-2">
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
              </div>
              <div className="text-sm ml-auto">
                +${formatPrice(total_amount)}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function TotalRevenueDisplay({ totalRevenue }: { totalRevenue: string }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold">Your total Revenue</h2>
      <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-fuchsia-600 dark:from-fuchsia-400 via-purple-600 dark:via-purple-400 to-violet-600 dark:to-violet-400 inline-block text-transparent bg-clip-text">
        ${totalRevenue}
      </span>
    </div>
  )
}

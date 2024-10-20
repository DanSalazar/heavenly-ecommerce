'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import dynamic from 'next/dynamic'
import { useThemeContext } from '@/components/providers/theme-provider'
import { OrderType } from '@/db/types'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const chartConfig = {
  options: {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    xaxis: {
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400
        }
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yaxis: {
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400
        }
      }
    },
    grid: {
      show: false
      // borderColor: '#dddddd',
      // strokeDashArray: 5,
      // xaxis: {
      //   lines: {
      //     show: true
      //   }
      // },
      // padding: {
      //   top: 5,
      //   right: 20
      // }
    },
    fill: {
      opacity: 0.8
    },
    tooltip: {
      theme: 'dark'
    }
  }
}

function calculateMonthlyRevenue(orders: OrderType[]) {
  const monthlyRevenue = new Array(12).fill(0)

  for (const order of orders) {
    const dateParts = order.order_created_at.split('-')
    const month = parseInt(dateParts[1]) - 1

    monthlyRevenue[month] += order.total_amount / 100
  }

  return monthlyRevenue
}

export default function ChartDashboard({ data }: { data: OrderType[] }) {
  const monthlyRevenue = calculateMonthlyRevenue(data)
  const theme = useThemeContext()

  return (
    <Card className="hidden md:block">
      <CardHeader className="pb-2">
        <CardTitle className="text-3xl">Sales</CardTitle>
        <CardDescription>Sales by month</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart
          type="bar"
          options={{
            ...chartConfig.options,
            colors: [theme?.isDarkTheme ? '#ecf0f1' : '#020617'],
            stroke: {
              lineCap: 'round',
              curve: 'smooth'
            }
          }}
          series={[
            {
              name: 'Sales',
              data: monthlyRevenue
            }
          ]}
          height={450}
          width={'100%'}
        />
      </CardContent>
    </Card>
  )
}

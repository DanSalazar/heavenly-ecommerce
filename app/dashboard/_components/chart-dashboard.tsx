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
      show: true,
      borderColor: '#dddddd',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 5,
        right: 20
      }
    },
    fill: {
      opacity: 0.8
    },
    tooltip: {
      theme: 'dark'
    }
  },
  series: [
    {
      name: 'Sales',
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500]
    }
  ]
}

export default function ChartDashboard() {
  const theme = useThemeContext()

  return (
    <Card className="h-[580px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Sales</CardTitle>
        <CardDescription>Sales by month</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart
          type="line"
          options={{
            ...chartConfig.options,
            colors: [theme?.isDarkTheme ? '#ecf0f1' : '#020617'],
            stroke: {
              lineCap: 'round',
              curve: 'smooth'
            }
          }}
          series={[...chartConfig.series]}
          height={450}
          width={'100%'}
        />
      </CardContent>
    </Card>
  )
}

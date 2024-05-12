'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
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
    colors: ['#020617'],
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
  return (
    <div className="flex flex-col gap-2 border border-zinc-100 rounded-md p-4">
      <h2 className="px-4 text-2xl font-semibold">Sales</h2>
      <Chart
        type="line"
        options={{
          ...chartConfig.options,
          stroke: {
            lineCap: 'round',
            curve: 'smooth'
          }
        }}
        series={[...chartConfig.series]}
        height={450}
        width={'100%'}
      />
    </div>
  )
}

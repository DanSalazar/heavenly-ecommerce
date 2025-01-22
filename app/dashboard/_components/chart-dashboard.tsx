'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ChartTab from './chart-tab'
import { SalesChart } from './sales-chart'

export type ChartData = {
  key: string
  Revenue: number
}[]
export type TimePeriodTab = 'weekly' | 'monthly' | 'yearly'

function ChartDashboard({ data }: { data: Record<TimePeriodTab, ChartData> }) {
  const [timePeriodTab, setTimePeriodTab] = useState<TimePeriodTab>('weekly')
  const chartData = data[timePeriodTab]

  const onChangeTimePeriodTab = (value: string) => {
    setTimePeriodTab(value as TimePeriodTab)
  }

  return (
    <Card className="col-span-2 hidden md:block">
      <CardHeader className="pb-4 flex-row">
        <CardTitle>Sales</CardTitle>
        <ChartTab
          timePeriod={timePeriodTab}
          onValueChange={onChangeTimePeriodTab}
        />
      </CardHeader>
      <CardContent>
        <SalesChart timePeriod={timePeriodTab} data={chartData} />
      </CardContent>
    </Card>
  )
}

export default ChartDashboard

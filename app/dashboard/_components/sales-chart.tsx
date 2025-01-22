import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { ChartData, TimePeriodTab } from './chart-dashboard'

const chartConfig = {} satisfies ChartConfig

export function SalesChart({
  timePeriod,
  data
}: {
  timePeriod: TimePeriodTab
  data: ChartData
}) {
  const color = 'hsl(var(--chart-1))'

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart accessibilityLayer data={data}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
            <stop offset="80%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray={'3 3'}
          strokeOpacity={1}
          vertical={false}
        />
        <XAxis
          dataKey="key"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => {
            if (timePeriod === 'yearly') return value
            return value.slice(0, 3)
          }}
        />
        <YAxis
          dataKey={'Revenue'}
          axisLine={false}
          tickLine={false}
          tickFormatter={value => {
            if (value < 1000) return `$${value}`
            return `$${value / 1000}K`
          }}
          tickMargin={10}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type={'monotone'}
          strokeWidth={2}
          stroke={color}
          dataKey="Revenue"
          fill={'url(#gradient)'}
        />
      </AreaChart>
    </ChartContainer>
  )
}

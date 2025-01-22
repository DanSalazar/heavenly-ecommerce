import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useUrlState from '@/hooks/useUrlState'

export default function ChartTab({
  timePeriod,
  onValueChange
}: {
  timePeriod: string
  onValueChange: (value: string) => void
}) {
  return (
    <Tabs
      value={timePeriod}
      onValueChange={val => onValueChange(val)}
      className="ml-auto">
      <TabsList>
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="monthly">Montly</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

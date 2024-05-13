import ChartDashboard from './_components/chart-dashboard'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const cardsData = [
  {
    desc: 'Total Revenue',
    title: '$1,559'
  },
  {
    desc: 'Products in stock',
    title: '25'
  },
  {
    desc: 'Total Orders',
    title: '60'
  }
]

export default async function Page() {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-2">
        {cardsData.map(card => (
          <Card key={card.title}>
            <CardHeader className="pb-2">
              <CardDescription>{card.desc}</CardDescription>
              <CardTitle className="text-4xl">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ChartDashboard />
    </>
  )
}

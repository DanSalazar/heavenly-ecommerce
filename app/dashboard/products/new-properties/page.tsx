import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Categories, Colors, Sizes } from './properties'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TABS = ['Colors', 'Sizes', 'Categories']

const TAB_TO_COMPONENT = [
  {
    value: 'Colors',
    component: <Colors />
  },
  {
    value: 'Sizes',
    component: <Sizes />
  },
  {
    value: 'Categories',
    component: <Categories />
  }
]

export default function NewProperties() {
  return (
    <>
      <header className="flex items-center gap-4">
        <Link
          href={'/dashboard/products'}
          className={buttonVariants({
            variant: 'outline',
            size: 'icon'
          })}>
          <ArrowLeftIcon />
          <span className="sr-only">Back</span>
        </Link>
        <h1 className="flex-1 text-xl font-semibold tracking-tight">
          Add Properties for Products
        </h1>
      </header>
      <Tabs defaultValue="Colors" className="mt-4">
        <TabsList>
          {TABS.map(tab => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {TAB_TO_COMPONENT.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}

import Price from '@/components/ecommerce/price'
import { TruckIcon } from '@/components/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { getBag } from '@/server/actions'
import BagEmpty from '../_components/bag-empty'
import ProductRow from '@/components/shopping-bag/product-row'

type SumProps = {
  description: string
  price: number
  discount?: boolean
}

function Sum({ description, price }: SumProps) {
  return (
    <div className="flex py-2 justify-between">
      <p className="capitalize">{description}</p>
      <Price price={price} />
    </div>
  )
}

export default async function Page() {
  const bag = await getBag()

  if (!bag.length) return <BagEmpty />

  const SHIPPING_PRICE = 0.0
  const total = bag.reduce((acc, item) => {
    const { bag_item, product } = item
    const price = product ? product.price : 0
    const quantity = Number(bag_item.quantity)

    return acc + quantity * price
  }, 0)

  return (
    <div className="mt-12 flex flex-col md:grid md:grid-cols-3 gap-8">
      <div className="col-span-2">
        <header className="mb-8 flex justify-between items-center flex-wrap">
          <h2 className="font-semibold uppercase text-6xl">Bag</h2>
          <span className="font-medium bg-primary py-1 px-2 rounded-md text-white">
            {bag.length}
          </span>
        </header>
        <div>
          {bag.map(item => {
            const { bag_item: _, product } = item

            if (!product) return <></>

            return <ProductRow key={product.id} product={product} />
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-semibold break-words">Summary</h2>
        <div className="border-b border-zinc-200 pb-4">
          <Sum description="Articles" price={total} />
          <Sum description="Shipping" price={SHIPPING_PRICE} />
        </div>
        <div className="flex py-2 justify-between">
          <p className="font-medium capitalize text-xl">Total</p>
          <Price size={'lg'} variant={'black'} price={SHIPPING_PRICE + total} />
        </div>
        <Button className="h-10">Checkout</Button>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="flex gap-2">
                <TruckIcon /> Free Shipping
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Your order qualifies for free shipping. Join US for free shipping
              on every order, every time
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

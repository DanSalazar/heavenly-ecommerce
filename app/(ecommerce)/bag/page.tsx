import Price from "@/components/ecommerce/price"
import { Truck } from "@/components/icons"
import ProductRow from "@/components/shopping-bag/product-row"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { product } from "@/lib/data"

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

export default function Page() {
  const SHIPPING_PRICE = 0.00
  const total = 4.99

	return (
    <div className="mt-12 flex flex-col md:grid md:grid-cols-3 gap-8">
      <div className="col-span-2">
        <header className="mb-8 flex gap-1 items-start">
          <h2 className="font-semibold uppercase text-6xl">Bag</h2>
          <span className="font-medium mt-2">1</span>
        </header>
        <div>
          <ProductRow product={product} />
           <ProductRow product={product} />
            <ProductRow product={product} />
             <ProductRow product={product} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-semibold break-words">Summary</h2>
        <div className="border-b border-zinc-200 pb-4">
          <Sum description="Articles" price={total} />
          <Sum description="Shipping" price={SHIPPING_PRICE} />
        </div>
        <Sum description="Total" price={SHIPPING_PRICE + total} />
        <Button className="h-10">Checkout</Button>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="flex gap-2">
                <Truck/> Free Shipping
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Your order qualifies for free shipping. Join US for free
              shipping on every order, every time
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
	)
}
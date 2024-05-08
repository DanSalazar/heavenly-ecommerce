import Price from '@/components/ecommerce/price'
import { marcellus } from '@/components/heavenly-icon'
import { HeartIcon, Package, Truck } from '@/components/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { product } from '@/lib/data'
import Image from 'next/image'

export default function Page() {
  return (
    <main className="flex flex-col md:grid grid-cols-2 md:px-24 gap-8">
      <div className="grid grid-cols-2 gap-4">
        <Image
          className="col-span-2"
          width={800}
          height={800}
          src={product.img_src}
          alt={product.title}
        />
        <Image
          className="hidden md:block"
          width={400}
          height={400}
          src={product.img_src}
          alt={product.title}
        />
        <Image
          className="hidden md:block"
          width={400}
          height={400}
          src={product.img_src}
          alt={product.title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className={marcellus.className + ' text-3xl uppercase'}>
          {product.title}
        </p>
        <Price price={product.price} />
        <p>
          adidas performance needs no introduction. The brand’s famous 3-Stripes
          can be seen on the track, field and in the latest streetwear trends.
        </p>
        <p>
          <span className="font-semibold text-xl mr-1">Color:</span> Green
        </p>
        <div>
          <p className="text-xl font-semibold mb-2">Sizes:</p>
          <div className="flex flex-wrap gap-2">
            <Button variant={'outline'} size={'sm'}>
              XS
            </Button>
            <Button variant={'outline'} size={'sm'}>
              S
            </Button>
            <Button variant={'outline'} size={'sm'}>
              M
            </Button>
          </div>
        </div>
        <Button className="h-10 w- uppercase">Add To Bag</Button>
        <div className="p-4 border border-zinc-200 rounded-md font-medium">
          <p className="flex gap-2 mb-4">
            <Truck />
            Free delivery on qualifying orders.
          </p>
          <p className="flex gap-2">
            <Package />
            Free returns.
          </p>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="uppercase">
              Payment & Delivery
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <p>
                <span className="font-medium">Payment Options:</span> We accept
                all major credit and debit cards, as well as PayPal and other
                secure payment methods. Your payment information is encrypted
                and secure.
              </p>
              <p>
                <span className="font-medium">Shipping:</span> We offer fast and
                reliable shipping options to ensure your order reaches you
                promptly. Shipping costs and delivery times vary depending on
                your location and the shipping method selected at checkout.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
}

import { db } from '@/db'
import { product as productSchema } from '@/db/schema'
import { eq } from 'drizzle-orm'
import ProductImagesContainer from './product-images-container'
import { marcellus } from '../fonts'
import Price from './price'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import AddToBag from './add-to-bag'
import BreadcrumbWrapper from '../ui/breadcrumb-wrapper'
import ProductNotAvailable from './product-not-available'

export default async function ProductDetail({ id }: { id: string }) {
  const product = await db.query.product.findFirst({
    where: eq(productSchema.id, id),
    with: {
      productVariations: {
        columns: {
          id: true,
          stock: true
        },
        with: {
          color: true,
          size: true
        }
      },
      images: true
    }
  })

  if (!product || !product.productVariations.length)
    return <ProductNotAvailable />

  return (
    <>
      <BreadcrumbWrapper pathname={`/${product.department}/${product.name}`} />
      <main className="min-h-[600px] flex flex-col md:grid grid-cols-2 gap-4 md:gap-12 mt-2 mb-12">
        <ProductImagesContainer
          thumbnail={product.thumbnail}
          images={product.images}
        />
        <div className="flex flex-col gap-2">
          <p className={marcellus.className + ' text-3xl uppercase'}>
            {product.name}
          </p>
          <Price
            size={'lg'}
            price={product.price}
            discount={product.discount}
            discount_percentage={product.percentage_off}
          />
          <p className="text-zinc-700 ">
            {product.description ||
              `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Similique cum facere quibusdam, iste enim repellat fugiat deleniti voluptatem`}
          </p>

          <AddToBag
            variants={product.productVariations}
            productId={product.id}
          />

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="uppercase">
                Payment & Delivery
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <p>
                  <span className="font-medium">Payment Options:</span> We
                  accept all major credit and debit cards, as well as PayPal and
                  other secure payment methods. Your payment information is
                  encrypted and secure.
                </p>
                <p>
                  <span className="font-medium">Shipping:</span> We offer fast
                  and reliable shipping options to ensure your order reaches you
                  promptly. Shipping costs and delivery times vary depending on
                  your location and the shipping method selected at checkout.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </>
  )
}

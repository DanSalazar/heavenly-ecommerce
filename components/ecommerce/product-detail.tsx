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
import { getFullProduct } from '@/data/products'
import { notFound } from 'next/navigation'

export default async function ProductDetail({ id }: { id: string }) {
  const product = await getFullProduct(id)

  if (!product || !product.productVariations.length) return notFound()

  return (
    <>
      <BreadcrumbWrapper pathname={`/${product.department}/${product.name}`} />
      <main className="relative min-h-[600px] flex flex-col md:grid grid-cols-2 gap-4 md:gap-12 mt-2 mb-12">
        <ProductImagesContainer
          thumbnail={product.thumbnail}
          images={product.images}
        />
        <div className="flex flex-col gap-2 sticky">
          <h2
            className={marcellus.className + ' text-3xl uppercase break-words'}>
            {product.name}
          </h2>
          <Price
            size={'lg'}
            price={product.price}
            discount={product.discount}
            discount_percentage={product.percentage_off}
          />
          <p className="text-zinc-700 break-words">{product.description}</p>

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

import Price from '@/components/ecommerce/price'
import ProductImagesContainer from '@/components/ecommerce/product-images-container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { getProductById } from '@/server/actions'
import { marcellus } from '@/components/fonts'
import AddToBag from './_components/add-to-bag'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import { db } from '@/db'
import { product } from '@/db/schema'
import ProductComponent from '@/components/ecommerce/product'

export default async function Page({
  params
}: {
  params: { department: string; id: string }
}) {
  const product = await getProductById(params.id)

  if (!product) return <div>No product</div>

  return (
    <>
      <BreadcrumbWrapper pathname={`/${params.department}/${product.name}`} />
      <main className="flex flex-col md:grid grid-cols-2 gap-12">
        <ProductImagesContainer
          thumbnail={product.thumbnail!}
          images={product.images}
        />
        <div className="flex flex-col gap-2">
          <p className={marcellus.className + ' text-3xl uppercase'}>
            {product.name}
          </p>
          <Price
            className="text-xl"
            price={product.price}
            discount={product.discount}
            discount_percentage={product.percentage_off}
          />
          <p className="text-zinc-700">
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
      <RelatedProducts />
    </>
  )
}

async function RelatedProducts() {
  const products = await db.select().from(product).limit(6)

  return (
    <div className="mt-16">
      <h2 className="font-medium text-xl mb-4">Related Products</h2>
      <div className="flex overflow-y-auto border-t gap-8 pt-4 pb-8 border-zinc-200">
        {products.map(product => (
          <ProductComponent product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

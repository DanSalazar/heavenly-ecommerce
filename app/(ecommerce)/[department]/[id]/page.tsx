import Price from '@/components/ecommerce/price'
import ProductImagesContainer from '@/components/ecommerce/product-images-container'
import { PackageIcon, TruckIcon } from '@/components/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { getProductById } from '@/server/actions'
import AddProductInBag from './_components/add-product-bag'
import { marcellus } from '@/components/fonts'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'

export default async function Page({
  params
}: {
  params: { department: string; id: string }
}) {
  const data = await getProductById(params.id)
  const product = data[0]?.product

  if (!product) return <div>No product</div>

  return (
    <>
      <BreadcrumbWrapper pathname={`/${params.department}/${product.name}`} />
      <main className="flex flex-col md:grid grid-cols-2 md:px-24 gap-8">
        <ProductImagesContainer image={product.image!} alt={product.name} />
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
          <p>{product.description}</p>
          <AddProductInBag data={data} productId={product.id} />
          <div className="p-4 border border-zinc-200 rounded-md font-medium">
            <p className="flex gap-2 mb-4">
              <TruckIcon />
              Free delivery on qualifying orders.
            </p>
            <p className="flex gap-2">
              <PackageIcon />
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

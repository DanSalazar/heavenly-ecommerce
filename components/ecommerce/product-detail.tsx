import ProductImagesContainer from './product-images-container'
import { marcellus } from '../fonts'
import Price from './price'
import AddToBag from './add-to-bag'
import BreadcrumbWrapper from '../ui/breadcrumb-wrapper'
import { getFullProduct } from '@/data/products'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import PaymentDeliveryAccordion from './payment-delivery-accordion'

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
        <div className="flex flex-col gap-2">
          <h2 className={cn('text-3xl break-words', marcellus.className)}>
            {product.brand}
          </h2>
          <h3 className={cn('text-3xl break-words', marcellus.className)}>
            {product.name}
          </h3>
          <Price
            size={'lg'}
            price={product.price}
            discount={product.discount}
            discount_percentage={product.percentage_off}
          />
          <p className="text-zinc-700 break-words prose">
            {product.description}
          </p>

          <AddToBag
            variants={product.productVariations}
            productId={product.id}
          />

          <PaymentDeliveryAccordion />
        </div>
      </main>
    </>
  )
}

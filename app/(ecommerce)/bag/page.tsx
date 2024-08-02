import Price from '@/components/ecommerce/price'
import { getBag } from '@/server/actions'
import BagEmpty from '../_components/bag-empty'
import ProductRow from '@/components/shopping-bag/product-row'
import { reduceBagPrice } from '@/utils'
import { OrderSummary } from '@/components/shopping-bag/order-summary'
import { createSession } from '@/server/stripe'
import { CheckoutButton } from './_components/checkout-button'
import Paypal from './_components/paypal'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'

export default async function Page() {
  const bag = await getBag()

  if (!bag.length) return <BagEmpty />

  const SHIPPING_PRICE = 0.0
  const total = reduceBagPrice(bag)

  return (
    <>
      <BreadcrumbWrapper />
      <div className="mt-12 flex flex-col md:grid md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <header className="mb-8 flex justify-between items-center flex-wrap">
            <h2 className="font-semibold uppercase text-6xl">Bag</h2>
            <span className="font-medium bg-primary py-1 px-2 rounded-md text-white">
              {bag.length}
            </span>
          </header>
          <div>
            {bag.map(bag_item => {
              if (!bag_item.product_variant) return <></>
              const { product_variant } = bag_item

              if (!product_variant.product) return <></>

              return (
                <ProductRow
                  key={product_variant.id}
                  id={bag_item.id}
                  quantity={bag_item.quantity!}
                  product={product_variant.product}
                  color={product_variant.color?.name!}
                  size={product_variant.size?.name!}
                />
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold break-words">Summary</h2>
          <div className="border-b border-zinc-200 pb-4">
            <OrderSummary title="Articles" price={total} />
            <OrderSummary title="Shipping" price={SHIPPING_PRICE} />
          </div>
          <div className="flex py-2 justify-between">
            <p className="font-medium capitalize text-xl">Total</p>
            <Price
              size={'lg'}
              variant={'black'}
              price={SHIPPING_PRICE + total}
            />
          </div>
          <form action={createSession}>
            <CheckoutButton />
          </form>
          <Paypal />
        </div>
      </div>
    </>
  )
}

import Price from '@/components/ecommerce/price'
import { OrderSummary } from '@/components/shopping-bag/order-summary'
import { createSession } from '@/server/stripe'
import Paypal from './paypal'
import { CheckoutButton } from './checkout-button'

const SHIPPING_PRICE = 0

export default function Summary({ total }: { total: number }) {
  return (
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
          className="font-medium"
          price={SHIPPING_PRICE + total}
        />
      </div>
      <form action={createSession}>
        <CheckoutButton />
      </form>
      <Paypal />
    </div>
  )
}

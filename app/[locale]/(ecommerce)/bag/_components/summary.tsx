import Price from '@/components/ecommerce/price'
import { OrderSummary } from '@/components/shopping-bag/order-summary'
import Paypal from './paypal'
import Stripe from './stripe'
import { MasterCardSVG, PaypalSVG, VisaSVG } from '@/components/icons'
import { useTranslations } from 'next-intl'

const SHIPPING_PRICE = 0

export default function Summary({ total }: { total: number }) {
  const t = useTranslations('bag')

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-zinc-200 pb-4 space-y-2">
        <OrderSummary title={t('articles')} price={total} />
        <OrderSummary title={t('shipping')} price={SHIPPING_PRICE} />
      </div>

      <div className="flex py-2 justify-between">
        <p className="font-medium capitalize text-xl">{t('total')}</p>
        <Price
          size={'lg'}
          variant={'black'}
          className="font-medium"
          price={SHIPPING_PRICE + total}
        />
      </div>

      <div className="min-h-28 flex flex-col gap-2">
        <Stripe />
        <Paypal />
      </div>

      <div className="flex gap-2">
        <PaypalSVG />
        <VisaSVG />
        <MasterCardSVG />
      </div>
    </div>
  )
}

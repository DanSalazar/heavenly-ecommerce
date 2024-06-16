import Price from '@/components/ecommerce/price'
import { OrderSummary } from '@/components/shopping-bag/order-summary'
import { getBag } from '@/server/actions'
import Image from 'next/image'

export default async function Summary() {
  const bag = await getBag()

  return (
    <div className="hidden lg:p-12 lg:pl-8 space-y-2 lg:block">
      <div className="p-4 space-y-4 rounded bg-white border border-zinc-300">
        <h2 className="font-semibold text-xl">Order Summary</h2>
        <div className="max-h-[250px] overflow-y-auto overflow-x-hidden flex flex-col gap-4 scrollbar scrollbar-rounded scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-zinc-50">
          {bag.length &&
            bag.map(bagItem => {
              const { product_variant } = bagItem

              if (product_variant && product_variant.product) {
                const { product } = product_variant

                return (
                  <div key={bagItem.id} className="flex flex-col md:flex-row gap-4">
                    <Image
                      src={product.image!}
                      width={96}
                      height={96}
                      alt={product.name}
                    />
                    <div className="flex justify-between pr-2 gap-2">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm">
                          Size:{' '}
                          <span className="uppercase">
                            {bagItem.product_variant?.size?.name}
                          </span>
                        </p>
                        <p className="text-sm">
                          Qty:{' '}
                          <span className="uppercase">
                            {bagItem.quantity || 1}
                          </span>
                        </p>
                      </div>
                      <Price
                        variant={'black'}
                        price={product.price * (bagItem.quantity || 1)}
                      />
                    </div>
                  </div>
                )
              }
            })}
        </div>
        <div className="space-y-2">
          <OrderSummary title="Subtotal" price={899} />
          <OrderSummary title="Discount" price={0} />
          <div className="flex py-2 justify-between">
            <p className="text-xl font-medium capitalize">Total</p>
            <Price price={899} variant={'black'} size={'lg'} />
          </div>
        </div>
      </div>
    </div>
  )
}

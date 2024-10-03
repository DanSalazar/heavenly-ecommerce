'use client'

import { BagItem } from '@/db/schema'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import DeleteItem from './delete-item'
import { useAction } from 'next-safe-action/hooks'
import { removeProductFromBag } from '@/actions/bag'
import { formatPrice, getDiscountPrice } from '@/utils'

export default function ProductBag({ bagItem }: { bagItem: BagItem }) {
  const { execute, isPending } = useAction(removeProductFromBag)

  if (!bagItem.product_variant || !bagItem.product_variant.product) return <></>

  const {
    product_variant: { product }
  } = bagItem

  return (
    <div
      className={cn('relative flex items-start gap-4', {
        'pointer-events-none opacity-20': isPending
      })}>
      <Image
        width={92}
        height={92}
        src={product.thumbnail}
        alt={product.name}
      />

      <div className="flex-1 flex justify-between relative">
        <div className="relative overflow-hidden">
          <h2 className="font-medium text-sm uppercase truncate">
            {product.brand}
          </h2>
          <p className="font-medium text-sm uppercase truncate">
            {product.name}
          </p>

          <div className="mt-2">
            <p className="font-medium text-sm">
              $
              {product.discount
                ? formatPrice(
                    getDiscountPrice(product.price, product.percentage_off)
                  )
                : formatPrice(product.price)}
            </p>
            {product.discount && (
              <div className="flex gap-2 text-sm">
                <p className="font-medium">
                  Originally: ${formatPrice(product.price)}
                </p>
                <span className="text-red-600 font-semibold">
                  -{product.percentage_off}%
                </span>
              </div>
            )}
          </div>

          <div className="w-full mt-2 text-sm">
            <p>
              Size{' '}
              <span>{bagItem.product_variant.size?.name.toUpperCase()}</span>
            </p>
            <p>Color: {bagItem.product_variant.color?.name}</p>
            <p>Quantity: {bagItem.quantity}</p>
          </div>
        </div>
      </div>
      <DeleteItem
        deleteAction={execute}
        className="absolute bottom-0 right-0"
        id={bagItem.id}
      />
    </div>
  )
}

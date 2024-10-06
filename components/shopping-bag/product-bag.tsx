'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import DeleteItem from './delete-item'
import { useAction } from 'next-safe-action/hooks'
import { removeProductFromBag } from '@/actions/bag'
import { formatPrice, getDiscountPrice } from '@/utils'

type ProductBagProps = {
  name: string
  thumbnail: string
  price: number
  discount: boolean
  percentage_off: number
  color: string
  size: string
  quantity: number
  id: number
}

export default function ProductBag({
  name,
  thumbnail,
  price,
  discount,
  percentage_off,
  color,
  size,
  quantity,
  id
}: ProductBagProps) {
  const { execute, isPending } = useAction(removeProductFromBag)

  return (
    <div
      className={cn('relative flex items-start gap-2', {
        'pointer-events-none opacity-20': isPending
      })}>
      <Image width={92} height={92} src={thumbnail} alt={name} />

      <div className="relative overflow-hidden">
        <h2 className="font-medium text-sm uppercase truncate">{name}</h2>

        <div className="mt-2">
          <p className="font-medium text-sm">
            $
            {discount
              ? formatPrice(getDiscountPrice(price, percentage_off))
              : formatPrice(price)}
          </p>
          {discount && (
            <div className="flex gap-2 text-xs">
              <p className="font-medium">
                Original Price: ${formatPrice(price)}
              </p>
              <span className="text-red-600 font-semibold">
                -{percentage_off}%
              </span>
            </div>
          )}
        </div>

        <div className="w-full mt-2 text-sm">
          <p>
            Size <span>{size.toUpperCase()}</span>
          </p>
          <p>Color: {color}</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
      <DeleteItem
        deleteAction={execute}
        className="absolute bottom-0 right-0"
        id={id}
      />
    </div>
  )
}

import { useState } from 'react'
import { BagItem } from '@/db/schema'
import Price from '../ecommerce/price'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import DeleteItem from './delete-item'

export default function ProductBag({ bagItem }: { bagItem: BagItem }) {
  if (!bagItem.product_variant || !bagItem.product_variant.product) return <></>
  const [isDeletePending, setDeletePending] = useState(false)
  const {
    product_variant: { product }
  } = bagItem

  return (
    <div
      className={cn('relative flex gap-2', {
        'pointer-events-none opacity-40': isDeletePending
      })}>
      <Image
        width={92}
        height={92}
        src={product.thumbnail}
        alt={product.name}
      />
      <div className="flex-1 flex flex-col relative gap-1 overflow-hidden">
        <p className="font-semibold text-sm uppercase truncate">
          {product.name}
        </p>
        <div className="flex justify-between">
          <div className="space-y-1 w-full">
            <p className="text-sm font-medium">
              Size{' '}
              <span>{bagItem.product_variant.size?.name.toUpperCase()}</span>
            </p>
            <p className="text-sm font-medium">
              Color{' '}
              <span className="capitalize">
                {bagItem.product_variant.color?.name}
              </span>
            </p>
            <p className="text-sm font-medium">Qty: {bagItem.quantity}</p>
          </div>
          <Price
            className="justify-end"
            price={product.price}
            variant={'black'}
            discount={product.discount}
            discount_percentage={product.percentage_off}
          />
        </div>
      </div>
      <DeleteItem
        className="absolute bottom-0 right-0"
        id={bagItem.id}
        setPending={(bool: boolean) => setDeletePending(bool)}
      />
    </div>
  )
}

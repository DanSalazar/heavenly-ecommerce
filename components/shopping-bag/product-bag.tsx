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
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">
              Size: {bagItem.product_variant.size?.name}
            </p>
            <p className="text-sm font-semibold">
              Color: {bagItem.product_variant.color?.name}
            </p>
            <p className="text-sm font-semibold">Qty: {bagItem.quantity}</p>
          </div>
          <Price price={product.price} variant={'black'} />
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

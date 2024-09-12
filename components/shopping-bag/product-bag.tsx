import { BagItem } from '@/db/schema'
import Price from '../ecommerce/price'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import DeleteItem from './delete-item'
import { capitalizeWord } from '@/utils'
import { useAction } from 'next-safe-action/hooks'
import { removeProductFromBag } from '@/actions/bag'

export default function ProductBag({ bagItem }: { bagItem: BagItem }) {
  if (!bagItem.product_variant || !bagItem.product_variant.product) return <></>
  const { execute, isPending } = useAction(removeProductFromBag)
  const {
    product_variant: { product }
  } = bagItem

  return (
    <div
      className={cn('relative flex gap-2', {
        'pointer-events-none opacity-20': isPending
      })}>
      <Image
        width={92}
        height={92}
        src={product.thumbnail}
        alt={product.name}
      />
      <div className="flex-1 flex justify-between relative">
        <div className="space-y-1 w-full relative overflow-hidden">
          <p className="font-semibold text-sm uppercase truncate">
            {product.name}
          </p>
          <div className="space-y-1 w-full">
            <p className="text-sm font-medium">
              Size{' '}
              <span>{bagItem.product_variant.size?.name.toUpperCase()}</span>
            </p>
            <p className="text-sm font-medium">
              Color{' '}
              <span className="capitalize">
                {bagItem.product_variant.color
                  ? capitalizeWord(bagItem.product_variant.color.name)
                  : ''}
              </span>
            </p>
            <p className="text-sm font-medium">Qty: {bagItem.quantity}</p>
          </div>
        </div>
        <Price
          price={product.price}
          variant={'black'}
          discount={product.discount}
          discount_percentage={product.percentage_off}
        />
      </div>
      <DeleteItem
        deleteAction={execute}
        className="absolute bottom-0 right-0"
        id={bagItem.id}
      />
    </div>
  )
}

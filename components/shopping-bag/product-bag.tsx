import { BagWithProduct } from '@/db/schema'
import Price from '../ecommerce/price'
import Image from 'next/image'

export default function ProductBag({ bagItem }: { bagItem: BagWithProduct }) {
  if (!bagItem.product_variant || !bagItem.product_variant.product) return <></>
  const {
    product_variant: { product }
  } = bagItem

  return (
    <div className="relative flex gap-2">
      <Image width={92} height={92} src={product.image!} alt={product.name} />
      <div className="flex-1 flex flex-col relative gap-1 overflow-hidden">
        <p className="font-semibold text-sm uppercase truncate">
          {product.name}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase font-semibold">Size</span>
            <span className="text-xs uppercase font-semibold">
              Qty: {bagItem.quantity}
            </span>
          </div>
          <Price price={product.price} variant={'black'} />
        </div>
      </div>
      <p className="absolute bottom-0 right-0 cursor-pointer text-sm text-zinc-600 hover:text-black hover:underline">
        Remove Item
      </p>
    </div>
  )
}

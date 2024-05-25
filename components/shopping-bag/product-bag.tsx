import { BagWithProduct } from '@/db/schema'
import Price from '../ecommerce/price'
import Image from 'next/image'

export default function ProductBag({ bagItem }: { bagItem: BagWithProduct }) {
  const {
    product_variant: { product }
  } = bagItem
  if (!product) return <></>

  return (
    <div className="relative flex gap-2.5">
      <Image width={96} height={96} src={product.image!} alt={product.name} />
      <div className="flex flex-col relative gap-1 overflow-hidden">
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
          <Price price={product.price} />
        </div>
      </div>
      <p className="absolute bottom-0 right-0 cursor-pointer text-sm text-zinc-600 hover:text-black hover:underline">
        Remove Item
      </p>
    </div>
  )
}

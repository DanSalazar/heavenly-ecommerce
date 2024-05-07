import { Product } from '@/lib/data'
import Price from '../ecommerce/price'
import Image from 'next/image'

export default function ProductBag({ product }: { product: Product }) {
  return (
    <div className="relative flex gap-2.5">
      <Image
        width={72}
        height={72}
        style={{
          height: 'auto',
          width: '100%'
        }}
        src={product.img_src}
        alt={product.title}
      />
      <div className="flex flex-col relative gap-1 overflow-hidden">
        <p className="font-semibold text-sm uppercase truncate">
          {product.title}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase font-semibold">Size M</span>
            <span className="text-xs uppercase font-semibold">Qty: 1</span>
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

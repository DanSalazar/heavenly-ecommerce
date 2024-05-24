import Link from 'next/link'
import Price from '../ecommerce/price'
import { QuantitySelector } from './quantity-selector'
import Image from 'next/image'
import { TrashIcon } from '../icons'
import { Product } from '@/db/schema'

export default function ProductRow({ product }: { product: Product }) {
  return (
    <div className="relative border-b border-t border-zinc-200 py-4 flex flex-col md:flex-row gap-4">
      <Image
        className="self-center"
        src={product.image!}
        width={180}
        height={230}
        alt={product.name}
      />
      <div className="col-span-2 flex flex-col gap-2 overflow-hidden">
        <Link
          href={'/'}
          className="font-medium text-zinc-700 hover:text-black truncate">
          {product.name}
        </Link>
        <span className="text-sm">Size: M</span>
        <Price className="mb-4" price={product.price} />
        <QuantitySelector />
      </div>
      <button className="absolute bottom-4 right-0">
        <TrashIcon />
      </button>
    </div>
  )
}

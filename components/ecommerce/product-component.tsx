'use client'

import Image from 'next/image'
import Link from 'next/link'
import Price from './price'
import { Product } from '@/db/types'

type ProductComponentProps = {
  product: Product
}

export default function ProductComponent({ product }: ProductComponentProps) {
  if (!product) return <></>

  return (
    <Link
      href={`/${product.department}/${product.id}`}
      className="animate-fade flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity group">
      <div className="relative h-[400px] flex overflow-hidden">
        <Image
          fill
          objectFit="cover"
          src={product.thumbnail}
          alt={product.name}
        />
        {product.discount && (
          <span className="text-sm bg-red-600 text-white font-medium absolute top-8 left-0 px-2">
            -{product.percentage_off}%
          </span>
        )}
      </div>
      <div>
        <p className="uppercase font-medium break-words">{product.brand}</p>
        <p className="uppercase font-medium break-words">{product.name}</p>
        <Price
          price={product.price}
          discount={product.discount}
          discount_percentage={product.percentage_off}
        />
      </div>
    </Link>
  )
}

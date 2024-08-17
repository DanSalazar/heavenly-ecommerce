'use client'

import Image from 'next/image'
import Link from 'next/link'
import Price from './price'
import type { Product } from '@/db/schema'

type ProductComponentProps = {
  product: Product
}

export default function ProductComponent({ product }: ProductComponentProps) {
  if (!product) return <></>

  return (
    <Link
      href={product.department + '/' + product.id}
      className="animate-fade flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity group">
      <div className="relative h-[400px] flex overflow-hidden">
        <Image
          fill
          objectFit="contain"
          src={product.thumbnail}
          alt={product.name}
        />
      </div>
      <div>
        <p className="uppercase font-medium">{product.brand}</p>
        <p className="uppercase font-medium">{product.name}</p>
        <Price
          price={product.price}
          discount={product.discount}
          discount_percentage={product.percentage_off}
        />
      </div>
    </Link>
  )
}

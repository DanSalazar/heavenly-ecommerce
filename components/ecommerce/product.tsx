'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Price from './price'
import { usePathname } from 'next/navigation'
import { Product } from '@/db/schema'

export default function ProductComponent({ product }: { product: Product }) {
  const pathname = usePathname()

  return (
    <Link
      href={pathname + '/' + product.id}
      className="md:w-[300px] flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity group">
      <div className="flex overflow-hidden">
        <Image
          src={product.image!}
          width={400}
          height={400}
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

import { Product } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Price from './price'
import { usePathname } from 'next/navigation'

export default function ProductComponent({ product }: { product: Product }) {
  const pathname = usePathname()
  return (
    <Link
      href={pathname + '/' + 1}
      className="md:w-[300px] flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity group">
      <div className="flex overflow-hidden">
        <Image
          src={product.img_src}
          width={400}
          height={400}
          alt={product.title}
        />
      </div>
      <div>
        <p className="uppercase font-medium">Brand</p>
        <p className="uppercase font-medium">{product.title}</p>
        <Price price={product.price} />
      </div>
    </Link>
  )
}

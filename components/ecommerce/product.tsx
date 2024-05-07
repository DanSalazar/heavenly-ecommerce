import { Product } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Price from './price'

export default function ProductComponent({ product }: { product: Product }) {
	return (
    <Link
      href='/'
      className="md:w-[300px] flex flex-col gap-4 cursor-pointer hover:opacity-80 transition-opacity group">
      <div className="flex overflow-hidden">
      	<Image
      		src={product.img_src}
      		width={400}
      		height={400}
      		alt={product.title}
      	/>
      </div>
      <div>
        <p className="uppercase font-medium">
          Brand
        </p>
        <p className="uppercase font-medium">
          {product.title}
        </p>
        <Price
          price={product.price}
        />
      </div>
    </Link>
	)
}
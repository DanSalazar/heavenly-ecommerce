import Link from 'next/link'
import ShoppingBagWrapper from './shopping-bag-wrapper'
import { LucideShoppingBag } from 'lucide-react'
import { getBag } from '@/data/bag'

export default async function ShoppingBag() {
  const bag = await getBag()

  return (
    <div className="relative flex h-full items-center group">
      {!!bag.length && (
        <div className="absolute top-3 -right-2 bg-red-400 pointer-events-none text-white font-semibold text-sm rounded-full h-5 w-5 flex items-center justify-center">
          {bag.length}
        </div>
      )}
      <Link href={'/bag'}>
        <LucideShoppingBag strokeWidth={1.5} />
        <span className="sr-only">Shopping Bag</span>
      </Link>
      <ShoppingBagWrapper bag={bag} />
    </div>
  )
}

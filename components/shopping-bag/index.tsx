import { getBag } from '@/server/actions'
import Link from 'next/link'
import { ShoppingBagIcon } from '../icons'
import ShoppingBagWrapper from './shopping-bag-wrapper'

export default async function ShoppingBag() {
  const bag = await getBag()

  return (
    <div className="relative flex h-full items-center group">
      {!!bag?.bagItem.length && (
        <div className="absolute top-3 -right-2 bg-red-500 pointer-events-none text-white font-semibold text-sm rounded-full h-5 w-5 flex items-center justify-center">
          {bag.bagItem.length}
        </div>
      )}
      <Link href={'/bag'}>
        <ShoppingBagIcon />
        <span className="sr-only">Shopping Bag</span>
      </Link>
      {bag?.bagItem.length && <ShoppingBagWrapper bag={bag.bagItem} />}
    </div>
  )
}

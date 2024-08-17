import Link from 'next/link'
import { HeartIcon, ShoppingBagIcon } from './icons'
import HeavenlyIcon from './heavenly-icon'
import ShoppingBag from './shopping-bag'
import Navigation from './navigation'
import SearchProduct from './search-product'
import { getBag } from '@/server/actions'

export default async function Navbar() {
  const bag = await getBag()

  return (
    <header className="relative z-10 h-16 border-b border-zinc-200 grid items-center grid-cols-3">
      <Navigation />
      <div className="bg-white flex items-center md:justify-center">
        <Link href={'/'}>
          <HeavenlyIcon />
        </Link>
      </div>
      <div className="self-stretch flex gap-3 justify-end items-center bg-white">
        <SearchProduct className="hidden md:block w-[300px]" />
        <Link href={'/favorites'}>
          <HeartIcon />
        </Link>
        <div className="relative flex h-full items-center group">
          {!!bag?.bagItem.length && (
            <div className="absolute top-3 -right-2 bg-red-500 text-white font-semibold text-sm rounded-full h-5 w-5 flex items-center justify-center">
              {bag.bagItem.length}
            </div>
          )}
          <Link href={'/bag'}>
            <ShoppingBagIcon />
            <span className="sr-only">Shopping Bag</span>
          </Link>
          {bag?.bagItem.length && <ShoppingBag bag={bag.bagItem} />}
        </div>
      </div>
    </header>
  )
}

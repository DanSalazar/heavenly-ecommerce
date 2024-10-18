import Link from 'next/link'
import { HeartIcon } from './icons'
import HeavenlyIcon from './heavenly-icon'
import Navigation from './navigation'
import SearchProduct from './search-product'
import ShoppingBag from './shopping-bag'
import { Suspense } from 'react'
import { Skeleton } from './ui/skeleton'

export default function Navbar() {
  return (
    <header className="bg-white relative top-0 h-16 z-20 border-b border-input grid grid-cols-3">
      <Navigation />
      <div className="bg-white flex items-center justify-center">
        <Link href={'/'}>
          <HeavenlyIcon />
        </Link>
      </div>
      <div className="flex gap-3 justify-end items-center bg-white">
        <SearchProduct className="hidden md:block w-[300px]" />
        <Link href={'/favorites'}>
          <HeartIcon width={24} height={24} />
        </Link>
        <Suspense fallback={<Skeleton className="w-6 h-6 rounded-lg" />}>
          <ShoppingBag />
        </Suspense>
      </div>
    </header>
  )
}

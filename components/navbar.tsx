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
    <header className="bg-white sticky top-0 z-20 h-16 border-b border-zinc-200 grid items-center grid-cols-3">
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
        <Suspense fallback={<Skeleton className="w-6 h-6 rounded-lg" />}>
          <ShoppingBag />
        </Suspense>
      </div>
    </header>
  )
}

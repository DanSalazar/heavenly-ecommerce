'use client'

import { useEffect, useState } from 'react'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'
import Price from '../ecommerce/price'
import Link from 'next/link'
import ProductBag from './product-bag'
import useMounted from '@/hooks/useMounted'
import { BagWithProduct } from '@/db/schema'
import { reduceBagPrice } from '@/utils'

export default function ShoppingBag({ bag }: { bag: BagWithProduct[] }) {
  const [open, setOpen] = useState(false)
  const isMounted = useMounted()
  const total = reduceBagPrice(bag)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isMounted) {
      setOpen(true)
      timer = setTimeout(() => {
        setOpen(false)
      }, 3000)
    }

    return () => clearTimeout(timer)
  }, [bag])

  return (
    <div
      className={cn(
        'p-4 -z-10 bg-white w-[300px] md:w-[350px] flex flex-col gap-4 absolute right-0 top-0 -translate-y-[400px] group-hover:translate-y-[52px] transition-transform ease-in-out duration-700 border-b border-r border-l border-zinc-200',
        {
          'translate-y-[52px]': open
        }
      )}>
      <header>
        <p className="font-semibold uppercase text-center">
          Your Bag, {bag.length}
        </p>
      </header>
      <div className="flex max-h-[240px] scrollbar scrollbar-rounded scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-50 overflow-y-auto flex-col gap-4 pr-2">
        {bag.map(bag_item => {
          return <ProductBag key={bag_item.id} bagItem={bag_item} />
        })}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="font-medium">Shipping</p>
          <Price price={0.0} />
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Total</p>
          <Price price={total} variant={'black'} />
        </div>
      </div>
      <footer>
        <Link href={'/bag'} className={buttonVariants() + ' h-[42px] w-full '}>
          View bag
        </Link>
      </footer>
    </div>
  )
}

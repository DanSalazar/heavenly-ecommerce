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
        '-z-10 bg-white w-[300px] md:w-[350px] flex flex-col absolute right-0 top-0 -translate-y-[400px] group-hover:translate-y-16 transition-transform ease-in-out duration-700 border-b border-r border-l border-zinc-200',
        {
          'translate-y-16': open
        }
      )}>
      <header className="p-4 flex justify-between">
        <p className="font-semibold uppercase">Your Bag</p>
        <span className="py-1 px-2.5 bg-black font-semibold text-white text-sm rounded-md">
          {bag.length}
        </span>
      </header>
      <div className="flex max-h-[220px] scrollbar scrollbar-rounded scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-50 overflow-y-auto flex-col gap-4 px-4">
        {bag.map(bag_item => {
          return <ProductBag key={bag_item.id} bagItem={bag_item} />
        })}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex justify-between">
          <p className="font-medium text-sm">Shipping:</p>
          <Price price={0.0} />
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-sm">Total:</p>
          <Price price={total} size={'lg'} variant={'black'} />
        </div>
      </div>
      <footer className="flex px-4 pb-4">
        <Link
          href={'/bag'}
          className={
            buttonVariants({ variant: 'outline' }) + ' border-primary flex-1'
          }>
          View your bag
        </Link>
      </footer>
    </div>
  )
}

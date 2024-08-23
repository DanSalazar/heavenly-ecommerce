'use client'

import { useEffect, useState } from 'react'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'
import Link from 'next/link'
import ProductBag from './product-bag'
import { BagItem } from '@/db/schema'
import { reduceBagPrice } from '@/utils'
import { OrderSummary } from './order-summary'

function ShoppingBagWrapper({ bag }: { bag: BagItem[] }) {
  const [open, setOpen] = useState(false)
  const [bagCount, setBagCount] = useState(bag.length)
  const total = reduceBagPrice(bag)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (bag.length > bagCount) {
      setOpen(true)
      setBagCount(bag.length)
      timer = setTimeout(() => {
        setOpen(false)
      }, 3000)
    }

    return () => clearTimeout(timer)
  }, [bag])

  return (
    <div
      className={cn(
        'hidden md:flex flex-col gap-4 p-4 -z-10 bg-white w-[300px] md:w-[350px] absolute right-0 top-0 -translate-y-[400px] group-hover:translate-y-[52px] transition-transform ease-in-out duration-700 border-b border-r border-l border-zinc-200',
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
      <div>
        <OrderSummary title="Shipping" price={0.0} />
        <OrderSummary title="Total" price={total} />
      </div>
      <footer>
        <Link href={'/bag'} className={buttonVariants() + ' h-[42px] w-full '}>
          View bag
        </Link>
      </footer>
    </div>
  )
}

export default ShoppingBagWrapper

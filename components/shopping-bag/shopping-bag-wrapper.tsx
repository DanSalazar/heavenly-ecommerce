'use client'

import { useEffect } from 'react'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'
import Link from 'next/link'
import ProductBag from './product-bag'
import { BagItem } from '@/db/schema'
import { reduceBagPrice } from '@/utils'
import { OrderSummary } from './order-summary'
import { useShoppingBagContext } from '../providers/shopping-bag-provider'

function ShoppingBagWrapper({ bag }: { bag: BagItem[] }) {
  const { isOpen, handleOpen } = useShoppingBagContext()
  const total = reduceBagPrice(bag)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isOpen) {
      timer = setTimeout(() => {
        handleOpen(false)
      }, 3000)
    }

    return () => clearTimeout(timer)
  }, [isOpen])

  return (
    <div
      className={cn(
        'max-h-[500px] transition-transform ease-in-out duration-700 transform -translate-y-[500px] flex flex-col gap-4 p-4 -z-20 bg-white w-[300px] md:w-[350px] absolute right-0 top-[63px] border-b border-r border-l border-zinc-200',
        {
          'translate-y-0': isOpen,
          'group-hover:translate-y-0': bag.length
        }
      )}>
      <div className="flex gap-2 items-center justify-between">
        <p className="font-medium uppercase">Your Bag</p>
        <span className="text-sm font-medium bg-primary py-1 px-2 rounded-md text-white">
          {bag.length}
        </span>
      </div>
      <div className="flex max-h-[250px] scrollbar scrollbar-rounded scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-50 overflow-y-auto flex-col gap-4 pr-2">
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

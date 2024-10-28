'use client'

import { useEffect } from 'react'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'
import Link from 'next/link'
import ProductBag from './product-bag'
import { reduceBagPrice } from '@/lib/utils'
import { OrderSummary } from './order-summary'
import { useShoppingBagContext } from '../providers/shopping-bag-provider'
import { BagItem } from '@/db/types'

function ShoppingBagWrapper({ bag }: { bag: BagItem[] }) {
  const { isOpen, handleOpen } = useShoppingBagContext()
  const total = reduceBagPrice(bag)
  const className =
    'max-h-[500px] transition-transform ease-in-out duration-700 transform -translate-y-[500px] group-hover:translate-y-0 flex flex-col gap-2 px-4 py-6 -z-20 bg-white w-[300px] md:w-[350px] absolute right-0 top-[63px] border-b border-r border-l border-primary/20'

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isOpen) {
      timer = setTimeout(() => {
        handleOpen(false)
      }, 3000)
    }

    return () => clearTimeout(timer)
  }, [handleOpen, isOpen])

  if (!bag.length)
    return (
      <div className={cn(className, 'text-center')}>
        <h2 className="text-lg font-semibold">Your shopping bag is empty</h2>
        <p className="text-sm text-zinc-500">
          Add items to your bag to see them here.
        </p>
        <Link href="/" className={buttonVariants() + ' mt-4'}>
          Continue Shopping
        </Link>
      </div>
    )

  return (
    <div
      className={cn(className, 'py-4', {
        'translate-y-0': isOpen
      })}>
      <div className="flex gap-2 items-center justify-between">
        <p className="font-medium uppercase">Your Bag</p>
        <span className="text-sm font-medium bg-primary py-1 px-2 rounded-md text-white">
          {bag.length}
        </span>
      </div>
      <div className="flex max-h-[250px] scrollbar scrollbar-rounded scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-50 overflow-y-auto flex-col gap-4 pr-2">
        {bag.map(bag_item => {
          return (
            <ProductBag
              key={bag_item.id}
              name={bag_item.product_variant.product.name}
              thumbnail={bag_item.product_variant.product.thumbnail}
              price={bag_item.product_variant.product.price}
              discount={bag_item.product_variant.product.discount}
              percentage_off={bag_item.product_variant.product.percentage_off}
              color={bag_item.product_variant.color.name}
              size={bag_item.product_variant.size.name}
              quantity={bag_item.quantity}
              id={bag_item.id}
            />
          )
        })}
      </div>
      <div className="flex flex-col gap-2 mt-2">
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

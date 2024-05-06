import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import Price from '../ecommerce/price'

export default function ShoppingBag() {
  return (
    <div
      className={cn(
        'bg-white flex flex-col absolute right-0 top-0 translate-y-[63px] hidden group-hover:block bg-white border-b border-r border-l border-zinc-200 w-[350px]'
      )}>
      <header className="p-4 flex justify-between">
        <p className="font-semibold uppercase">
          Your Bag
        </p>
        <span className="py-1 px-2.5 bg-black font-semibold text-white text-sm rounded-md">
          1
        </span>
      </header>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex justify-between">
          <p className="font-medium text-sm">Shipping:</p>
          <Price price={0.0} />
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-sm">Total:</p>
          <Price price={150} />
        </div>
      </div>
      <footer className="flex px-4 pb-4">
        <Button
          className='flex-1'
          variant={'outline'}>
          View your bag
        </Button>
      </footer>
    </div>
  )
}
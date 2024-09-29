import { buttonVariants } from '@/components/ui/button'
import { LucideShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function BagEmpty() {
  return (
    <div className="flex text-center items-center justify-center h-[500px] flex-col gap-2">
      <LucideShoppingBag width={92} height={92} strokeWidth={1.5} />
      <h2 className="font-semibold text-black text-2xl">Your bag is empty</h2>
      <p className="text-zinc-500">Add your favorite items in it.</p>
      <Link href="/" className={buttonVariants() + ' mt-2'}>
        Go to Shopping
      </Link>
    </div>
  )
}

import { HeartIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="flex text-center items-center justify-center h-[450px] flex-col gap-2">
      <HeartIcon width={48} height={48} />
      <h2 className="font-semibold text-2xl">Your favorite list is empty</h2>
      <p className="text-zinc-500">Add your favorite items in it.</p>
      <Link
        href="/"
        className={buttonVariants({ variant: 'outline' }) + ' mt-2'}>
        Go to Shopping
      </Link>
    </main>
  )
}

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-[500px] flex flex-col gap-2 items-center justify-center">
      <h2 className="font-semibold text-4xl">
        404 - The page could not be found
      </h2>
      <p className="text-xl font-medium">
        Sorry, our bad... Seems like we couldn&apos;t find what you were looking
        for.
      </p>
      <Link href={'/'} className={buttonVariants({ variant: 'outline' })}>
        Go to Shopping
      </Link>
    </div>
  )
}

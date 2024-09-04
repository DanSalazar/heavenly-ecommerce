import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="bg-sky-blue-100 h-[400px] flex items-center justify-center flex-col gap-2">
      <h1 className="text-4xl font-semibold">Success</h1>
      <p className="text-2xl font-medium">Thanks for buying us!</p>
      <Link href="/" className={buttonVariants()}>
        Go to shopping
      </Link>
    </div>
  )
}

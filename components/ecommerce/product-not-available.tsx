import Link from 'next/link'
import { buttonVariants } from '../ui/button'

export default function ProductNotAvailable() {
  return (
    <div className="min-h-[500px] flex flex-col gap-2 items-center col-span-2 justify-center">
      <p className="text-3xl uppercase">Oops!!</p>
      <p>Sorry! The page you are looking for was not found.</p>
      <Link href={'/'} className={buttonVariants() + ' mt-2 w-48'}>
        Home
      </Link>
    </div>
  )
}

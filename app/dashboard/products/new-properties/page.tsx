import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Categories, Colors, Sizes } from '../_components/properties'

export default function NewProperties() {
  return (
    <>
      <header className="flex items-center gap-4">
        <Link
          href={'/dashboard/products'}
          className={buttonVariants({
            variant: 'outline',
            size: 'icon'
          })}>
          <ArrowLeftIcon />
          <span className="sr-only">Back</span>
        </Link>
        <h1 className="flex-1 text-xl font-semibold tracking-tight">
          Add Properties for Products
        </h1>
      </header>
      <div className="space-y-8 md:grid md:grid-cols-2 md:px-24 md:space-y-0 md:gap-8">
        <Colors />
        <Sizes />
        <Categories />
      </div>
    </>
  )
}

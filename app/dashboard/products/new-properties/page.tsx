import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import Colors from '../_components/colors'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function NewProperties() {
  return (
    <div className="grid md:px-24 gap-8">
      <Link className={buttonVariants() + ' w-20'} href={'/dashboard/products'}>
        <ArrowLeftIcon /> Go back
      </Link>
      <Colors />
    </div>
  )
}

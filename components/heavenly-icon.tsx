import { Marcellus } from 'next/font/google'
import Link from 'next/link'

export const marcellus = Marcellus({ subsets: ['latin'], weight: '400' })

export default function HeavenlyIcon() {
  return (
    <Link href={'/'} className={marcellus.className + ' text-2xl uppercase'}>
      Heavenly
    </Link>
  )
}

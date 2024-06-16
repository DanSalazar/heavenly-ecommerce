import Link from 'next/link'
import { marcellus } from './fonts'

export default function HeavenlyIcon() {
  return (
    <Link href={'/'} className={marcellus.className + ' text-2xl uppercase'}>
      Heavenly
    </Link>
  )
}

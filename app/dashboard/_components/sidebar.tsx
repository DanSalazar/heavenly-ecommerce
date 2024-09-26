import HeavenlyIcon from '@/components/heavenly-icon'
import Link from 'next/link'
import NavLinks from './nav-links'

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-background min-h-screen md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <HeavenlyIcon />
          </Link>
        </div>
        <div className="flex-1 px-4 flex flex-col gap-8">
          <NavLinks />
        </div>
      </div>
    </div>
  )
}

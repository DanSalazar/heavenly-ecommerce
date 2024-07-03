'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinks = {
  id: string
  path: string
  title: string
}

const links: NavLinks[] = [
  {
    id: '0',
    path: '/women',
    title: 'Women'
  },
  {
    id: '1',
    path: '/men',
    title: 'Men'
  }
]

export default function Navigation() {
  const pathname = usePathname()
  const department = pathname.split('/')[1]

  return (
    <nav className="hidden bg-white md:flex  items-center gap-4">
      {links.map(link => (
        <Link
          key={link.id}
          className={cn('uppercase font-medium', {
            underline: department === link.title.toLowerCase()
          })}
          href={link.path}>
          {link.title}
        </Link>
      ))}
    </nav>
  )
}

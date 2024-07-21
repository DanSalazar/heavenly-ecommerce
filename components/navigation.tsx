'use client'

import Link from 'next/link'

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
  return (
    <nav className="hidden bg-white md:flex items-center gap-4">
      {links.map(link => (
        <Link
          key={link.id}
          className={
            'uppercase underline-offset-4 text-zinc-500 hover:text-black transition-colors hover:underline'
          }
          href={link.path}>
          {link.title}
        </Link>
      ))}
    </nav>
  )
}

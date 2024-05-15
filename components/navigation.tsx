'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'

type NavLinks = {
  id: string
  path: string
  link: string
}

const links: NavLinks[] = [
  {
    id: '0',
    path: '/women',
    link: 'Women'
  },
  {
    id: '1',
    path: '/men',
    link: 'Men'
  }
]

const NavOpenContent = ({
  open,
  title,
  onLeave
}: {
  open: boolean
  title: string
  onLeave: () => void
}) => {
  const categories = ['Shirts', 'Shoes', 'Jeans']
  return (
    <div
      onMouseLeave={onLeave}
      className={cn(
        'bg-white w-full md:min-w-[500px] md:max-w-[500px] md:min-h-[300px] md:-translate-y-[600px] transition-transform duration-500 ease-in-out flex flex-col gap-4 cursor-default absolute top-16 left-0 p-5 md:border-r md:border-l md:border-b border-zinc-200 -z-10',
        {
          'md:-translate-y-0': open
        }
      )}>
      <p className="text-6xl font-semibold uppercase">{title}</p>
      <div className="flex flex-col h-full md:max-h-[350px] flex-wrap gap-2">
        {categories.map((category, i) => (
          <p
            key={category + i}
            className="cursor-pointer font-medium text-zinc-500 hover:underline hover:text-black">
            {category}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function Navigation() {
  const [navOpen, setNavOpen] = useState<{ open: boolean; title: string }>({
    open: false,
    title: ''
  })
  return (
    <nav
      onMouseLeave={() => setNavOpen({ open: false, title: '' })}
      className="hidden bg-white md:flex  items-center gap-4">
      {links.map((link, i) => (
        <Link
          onMouseOver={() =>
            setNavOpen({
              open: true,
              title: link.link
            })
          }
          key={link.id}
          className="uppercase font-medium"
          href={link.path}>
          {link.link}
        </Link>
      ))}
      <NavOpenContent
        open={navOpen.open}
        onLeave={() => setNavOpen({ open: false, title: '' })}
        title={navOpen.title}
      />
    </nav>
  )
}

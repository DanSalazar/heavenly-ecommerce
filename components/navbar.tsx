'use client'

import Link from 'next/link'
import { HeartIcon, ShoppingBagIcon } from './icons'
import HeavenlyIcon from './heavenly-icon'
import ShoppingBag from './shopping-bag'
import { useState } from 'react'
import { cn } from '@/lib/utils'

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

export default function Navbar() {
  const [navOpen, setNavOpen] = useState<{ open: boolean; title: string }>({
    open: false,
    title: ''
  })

  return (
    <header className="relative z-0 h-16 border-b border-zinc-200 grid grid-cols-2 md:grid-cols-3">
      <nav
        onMouseLeave={() => setNavOpen({ open: false, title: '' })}
        className="hidden bg-white md:flex  items-center gap-4">
        {links.map(link => (
          <Link
            onMouseOver={() =>
              setNavOpen({
                open: true,
                title: link.link
              })
            }
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
      <div className="bg-white flex items-center md:justify-center">
        <HeavenlyIcon />
      </div>
      <div className="self-stretch flex gap-2 justify-end items-center bg-white">
        <Link href={'/favorites'}>
          <HeartIcon />
        </Link>
        <div className="relative h-full flex items-center group">
          <ShoppingBagIcon />
          <ShoppingBag />
        </div>
      </div>
    </header>
  )
}

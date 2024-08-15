'use client'

import Link from 'next/link'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { MenuIcon } from './icons'
import SearchProduct from './search-product'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type NavLink = {
  id: string
  href: string
  title: string
}

const links: NavLink[] = [
  {
    id: '0',
    href: '/women',
    title: 'Women'
  },
  {
    id: '1',
    href: '/men',
    title: 'Men'
  }
]

const linkClasses =
  'uppercase underline-offset-4 transition-colors text-zinc-500 hover:underline hover:text-black'

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="hidden md:flex gap-4">
        {links.map((link, i) => (
          <Link
            key={link.title}
            className={cn(linkClasses, {
              'text-primary underline': pathname.includes(link.href)
            })}
            href={link.href}>
            {link.title}
          </Link>
        ))}
      </nav>
      <Sheet open={open} onOpenChange={value => setOpen(value)}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <MenuIcon />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-4 mt-8">
            <SearchProduct extendOnSubmit={() => setOpen(false)} />
            <nav className="grid gap-4">
              {links.map(link => (
                <SheetClose key={link.title} asChild>
                  <Link
                    className={cn(linkClasses, {
                      'text-primary': pathname.includes(link.href)
                    })}
                    href={link.href}>
                    {link.title}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

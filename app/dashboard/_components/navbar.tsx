'use client'

import HeavenlyIcon from '@/components/heavenly-icon'
import { Button } from '@/components/ui/button'
import { CircleUserIcon, MenuIcon } from '@/components/icons'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const Links = [
  {
    href: '/dashboard',
    title: 'Dashboard'
    // icon: <HomeIcon />
  },
  {
    href: '/dashboard/products',
    title: 'Products'
    // icon: <ShoppingBagIcon />
  },
  {
    href: '/dashboard/orders',
    title: 'Orders'
    // icon: <PackageIcon />
  },
  {
    href: '/dashboard/settings',
    title: 'Settings'
    // icon: <SettingsIcon />
  }
]

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <HeavenlyIcon />
          <span className="sr-only">Heavenly</span>
        </Link>
        {Links.map(link => (
          <Link
            key={link.title}
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground">
            {link.title}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <MenuIcon />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold">
              <HeavenlyIcon />
              <span className="sr-only">Heavenly</span>
            </Link>
            {Links.map(link => (
              <Link
                key={link.title}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground">
                {link.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUserIcon />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

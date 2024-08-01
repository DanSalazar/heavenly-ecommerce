'use client'

import HeavenlyIcon from '@/components/heavenly-icon'
import { Button } from '@/components/ui/button'
import { MenuIcon } from '@/components/icons'
import Link from 'next/link'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import ToggleTheme from './toggle-theme'
import { UserButton, UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useThemeContext } from '@/components/providers/theme-provider'

const Links = [
  {
    href: '/dashboard',
    title: 'Dashboard'
  },
  {
    href: '/dashboard/products',
    title: 'Products'
  },
  {
    href: '/dashboard/orders',
    title: 'Orders'
  },
  {
    href: '/dashboard/settings',
    title: 'Settings'
  }
]

export default function Navbar() {
  const { isDarkTheme } = useThemeContext()

  return (
    <header className="sticky top-0 flex items-center gap-4 border-b bg-background z-10 px-4 md:px-6">
      <nav className="hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
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
          <nav className="grid gap-4 text-lg font-medium">
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
        <ToggleTheme />
        <UserButton
          userProfileProps={{
            appearance: {
              baseTheme: isDarkTheme ? dark : undefined
            }
          }}
          appearance={{
            baseTheme: isDarkTheme ? dark : undefined,
            elements: {
              userButtonAvatarBox: 'h-10 w-10'
            }
          }}
        />
      </div>
    </header>
  )
}

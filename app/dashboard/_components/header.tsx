'use client'

import HeavenlyIcon from '@/components/heavenly-icon'
import NavLinks from './nav-links'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { UserButton } from '@clerk/nextjs'
import ToggleTheme from './toggle-theme'
import { usePathname } from 'next/navigation'
import User from './user'

export default function Header() {
  const pathname = usePathname()
  const currentPageName = pathname.split('/')[2] || 'Dashboard'

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <h2 className="hidden md:block tracking-tight text-2xl font-semibold capitalize">
        {currentPageName}
      </h2>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <HeavenlyIcon className="mt-4" />
          <NavLinks />
        </SheetContent>
      </Sheet>
      <div className="flex gap-4 ml-auto">
        <ToggleTheme />
        <User />
      </div>
    </header>
  )
}

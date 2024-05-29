'use client'

import { useState } from 'react'
import HeavenlyIcon from '@/components/heavenly-icon'
import { Button } from '@/components/ui/button'
import Navigation from './navigation'
import { ListIcon } from '@/components/icons'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b lg:border-r border-zinc-200 dark:border-zinc-700 flex lg:min-h-screen lg:w-[200px] p-4 lg:py-6">
      <div className="text-center flex-1 flex lg:flex-col gap-4">
        <Button
          onClick={() => setMobileOpen(true)}
          size={'sm'}
          variant={'ghost'}
          className="block lg:hidden">
          <ListIcon />
        </Button>
        <HeavenlyIcon />
        <Navigation
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>
    </header>
  )
}

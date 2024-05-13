'use client'

import HeavenlyIcon from '@/components/heavenly-icon'
import {
  HomeIcon,
  MarkIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon
} from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Links = [
  {
    href: '/dashboard',
    title: 'Dashboard',
    icon: <HomeIcon />
  },
  {
    href: '/dashboard/products',
    title: 'Products',
    icon: <ShoppingBagIcon />
  },
  {
    href: '/dashboard/orders',
    title: 'Orders',
    icon: <PackageIcon />
  },
  {
    href: '/dashboard/settings',
    title: 'Settings',
    icon: <SettingsIcon />
  }
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'fixed xl:static top-0 bottom-0 left-0 w-4/6 xl:w-auto hidden md:flex p-8 xl:p-0 flex-col gap-4'
      )}>
      <div className="flex xl:hidden items-center justify-between">
        <HeavenlyIcon />
        {/* <Button className="self-end" variant={'ghost'}>
          <MarkIcon width={24} height={24} />
        </Button>*/}
      </div>
      {Links.map((link, i) => (
        <Link
          href={link.href}
          key={link.href + i}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'justify-start gap-2 h-0 py-6 text-base',
            {
              'text-background hover:text-background bg-primary hover:bg-primary dark:hover:bg-primary dark:hover:text-background':
                link.href === pathname ||
                (pathname.includes(link.href) && link.href !== '/dashboard')
            }
          )}>
          {link.icon} {link.title}
        </Link>
      ))}
    </nav>
  )
}

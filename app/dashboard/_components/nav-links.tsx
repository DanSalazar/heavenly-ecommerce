'use client'

import { cn } from '@/lib/utils'
import { Home, Package, Settings, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Links = [
  {
    href: '/dashboard',
    title: 'Dashboard',
    icon: Home
  },
  {
    href: '/dashboard/products',
    title: 'Products',
    icon: Package
  },
  {
    href: '/dashboard/orders',
    title: 'Orders',
    icon: ShoppingBag
  },
  {
    href: '/dashboard/settings',
    title: 'Settings',
    icon: Settings
  }
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 text-sm font-medium">
      {Links.map(link => (
        <Link
          key={link.title}
          href={link.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted',
            {
              'bg-muted': pathname === link.href
            }
          )}>
          <link.icon className="h-5 w-5" strokeWidth={1.5} />
          {link.title}
        </Link>
      ))}
    </nav>
  )
}

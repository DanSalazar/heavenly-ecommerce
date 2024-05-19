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

export const Overlay = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <div
      className={cn('z-10 hidden fixed top-0 left-0 bottom-0 right-0', {
        block: open
      })}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      onClick={onClose}></div>
  )
}

export default function Navigation({
  mobileOpen,
  onClose
}: {
  mobileOpen: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  return (
    <>
      <Overlay open={mobileOpen} onClose={onClose} />
      <nav
        className={cn(
          'z-20 transition-transform -translate-x-[750px] fixed lg:static lg:translate-x-0 top-0 bottom-0 left-0 w-4/6 lg:w-auto bg-background flex p-6 lg:p-0 flex-col gap-4',
          {
            'translate-x-0': mobileOpen
          }
        )}>
        <div className="flex justify-end lg:hidden">
          <Button onClick={onClose} variant={'ghost'} size={'sm'}>
            <MarkIcon />
          </Button>
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
                  link.href === pathname
              }
            )}>
            {link.icon} {link.title}
          </Link>
        ))}
      </nav>
    </>
  )
}

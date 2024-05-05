import Link from 'next/link'
import { HeartIcon, ShoppingBagIcon } from './icons'
import HeavenlyIcon from './heavenly-icon'

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

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-zinc-200 grid grid-cols-2 md:grid-cols-3 items-center">
      <nav className="hidden md:flex gap-4">
        {links.map(link => (
          <Link className="uppercase font-medium" href={link.path}>
            {link.link}
          </Link>
        ))}
      </nav>
      <div className="flex items-center md:justify-center">
        <HeavenlyIcon />
      </div>
      <div className="flex gap-2 justify-end items-center">
        <HeartIcon />
        <ShoppingBagIcon />
      </div>
    </header>
  )
}

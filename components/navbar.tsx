import Link from 'next/link'
import { HeartIcon, ShoppingBagIcon } from './icons'
import HeavenlyIcon from './heavenly-icon'
import ShoppingBag from './shopping-bag'

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
    <header className="relative z-20 h-16 border-b border-zinc-200 grid grid-cols-2 md:grid-cols-3">
      <nav className="hidden md:flex self-center gap-4">
        {links.map(link => (
          <Link className="uppercase font-medium" href={link.path}>
            {link.link}
          </Link>
        ))}
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

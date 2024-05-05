import Link from "next/link"
import { Marcellus } from "next/font/google"
import { HeartIcon, ShoppingBagIcon } from "./icons"

const marcellus = Marcellus({ subsets: ["latin"], weight: "400" })

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


const Heavenly = () => (
  <Link href={'/'} className={marcellus.className + ' text-2xl uppercase'} >
    Heavenly
  </Link>
)

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
				<Heavenly />
			</div>
			<div className="flex gap-2 justify-end items-center">
				<HeartIcon />
				<ShoppingBagIcon/>
			</div>
    </header>
	)
}
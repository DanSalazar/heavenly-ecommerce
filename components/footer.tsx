import { Suspense } from 'react'
import HeavenlyIcon from './heavenly-icon'
import { SocialsSkeletons } from './skeletons'
import SocialMedia from './social-media'

const NavigationList: { title: string; list: string[] }[] = [
  {
    title: 'navigation',
    list: ['women', 'men']
  },
  {
    title: 'about',
    list: ['user Agreement', 'privacy Policy']
  }
]

const FooterNavigationList = ({ list }: { list: string[] }) => (
  <>
    {list.map(item => (
      <li
        className="text-zinc-500 uppercase cursor-pointer hover:text-black"
        key={item}>
        {item}
      </li>
    ))}
  </>
)

export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 md:flex-row justify-between border-t border-zinc-200 pt-6 pb-12">
      <div className="flex flex-col gap-4 md:gap-2 md:w-2/6">
        <HeavenlyIcon />
        <p className="text-sm">
          Online brand clothing store Heavenly focuses on seling only qualify
          and branded items, limited edition collections by fashion designers
        </p>
        <Suspense fallback={<SocialsSkeletons />}>
          <SocialMedia />
        </Suspense>
      </div>
      <div className="flex flex-wrap justify-between md:gap-16">
        {NavigationList.map(navigationItem => (
          <ul key={navigationItem.title}>
            <li className="font-semibold text-black uppercase">
              {navigationItem.title}
            </li>
            <ul className="flex flex-col gap-2 mt-2">
              <FooterNavigationList list={navigationItem.list} />
            </ul>
          </ul>
        ))}
      </div>
    </footer>
  )
}

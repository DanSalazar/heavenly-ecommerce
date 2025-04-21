import { Suspense } from 'react'
import { useTranslations } from 'next-intl'
import HeavenlyIcon from './heavenly-icon'
import { SocialsSkeletons } from './skeletons'
import SocialMedia from './social-media'
import { MasterCardSVG, PaypalSVG, VisaSVG } from './icons'

const NavigationList: { title: string; list: string[] }[] = [
  {
    title: 'navigation.title',
    list: ['navigation.women', 'navigation.men']
  },
  {
    title: 'navigation.about',
    list: ['navigation.userAgreement', 'navigation.privacyPolicy']
  }
]

const FooterNavigationList = ({ list }: { list: string[] }) => {
  const t = useTranslations()

  return (
    <>
      {list.map(item => (
        <li
          className="text-zinc-500 uppercase cursor-pointer hover:text-black"
          key={item}>
          {t(item)}
        </li>
      ))}
    </>
  )
}

export default function Footer() {
  const t = useTranslations()
  return (
    <>
      <footer className="flex flex-col gap-8 md:flex-row justify-between border-t border-zinc-200 pt-6 pb-12">
        <div className="flex flex-col gap-4 md:gap-2 md:w-2/6">
          <HeavenlyIcon />
          <p className="text-sm">{t('info.about')}</p>
          <Suspense fallback={<SocialsSkeletons />}>
            <SocialMedia />
          </Suspense>
        </div>
        <div className="flex flex-wrap justify-between md:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-black uppercase">
              {t('payment.methods')}
            </h2>
            <div className="flex gap-2">
              <PaypalSVG />
              <VisaSVG />
              <MasterCardSVG />
            </div>
          </div>
          {NavigationList.map(navigationItem => (
            <ul key={navigationItem.title}>
              <li className="font-semibold text-black uppercase">
                {t(navigationItem.title)}
              </li>
              <li>
                <ul className="flex flex-col gap-2 mt-2">
                  <FooterNavigationList list={navigationItem.list} />
                </ul>
              </li>
            </ul>
          ))}
        </div>
      </footer>
      <div className="text-center text-sm text-zinc-500 pb-4">
        <p>{t('about.copyright')}</p>
      </div>
    </>
  )
}

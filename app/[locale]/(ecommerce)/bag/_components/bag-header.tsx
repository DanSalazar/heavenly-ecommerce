import { useTranslations } from 'next-intl'

export default function BagHeader({ count }: { count: number }) {
  const t = useTranslations('bag')

  return (
    <header className="mb-8 flex items-start gap-2">
      <h2 className="uppercase text-4xl md:text-7xl font-semibold break-words">
        {t('title')} <span className="text-xl md:text-2xl">({count})</span>
      </h2>
    </header>
  )
}

'use client'

import { useTranslations } from 'next-intl'

export function NoProductsAvailable() {
  const t = useTranslations('products')

  return (
    <div className="border-t min-h-[400px] flex items-center justify-center flex-col gap-2">
      <h2 className="text-2xl text-5xl font-semibold">
        {t('noProductsToShowTitle')}
      </h2>
      <p>{t('noProductsToShowSubtitle')}</p>
    </div>
  )
}

export function NoSearchResults() {
  const t = useTranslations('products')

  return (
    <div className="min-h-[400px] flex items-center justify-center text-center flex-col gap-2">
      <h2 className="text-2xl md:text-5xl font-bold">
        {t('noSearchResultsTitle')}
      </h2>
      <p>{t('noSearchResultsSubtitle')}</p>
    </div>
  )
}

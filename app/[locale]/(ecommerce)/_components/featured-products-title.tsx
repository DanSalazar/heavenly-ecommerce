'use client'
import { marcellus } from '@/components/fonts'
import { useTranslations } from 'next-intl'

export default function FeaturedProductsTitle() {
  const t = useTranslations('style')

  return (
    <h2 className={marcellus.className + ' text-2xl uppercase'}>
      {t('featuredProducts')}
    </h2>
  )
}

'use client'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function SuccessContent() {
  const t = useTranslations('success')

  return (
    <div className="bg-sky-blue-100 h-[400px] flex items-center justify-center flex-col gap-2">
      <h1 className="text-4xl font-semibold">{t('message')}</h1>
      <Link href="/" className={buttonVariants()}>
        {t('goToShopping')}
      </Link>
    </div>
  )
}

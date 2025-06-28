'use client'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function SuccessContent() {
  const t = useTranslations('success')

  useEffect(() => {
    document.cookie = 'bag_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }, [])

  return (
    <div className="bg-sky-blue-100 h-[400px] flex items-center justify-center flex-col gap-2">
      <h1 className="text-4xl font-semibold">{t('message')}</h1>
      <Link href="/" className={buttonVariants()}>
        {t('goToShopping')}
      </Link>
    </div>
  )
}

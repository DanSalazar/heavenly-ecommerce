'use client'

import { buttonVariants } from '@/components/ui/button'
import { LucideShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function BagEmpty() {
  const t = useTranslations('cart')

  return (
    <div className="flex text-center items-center justify-center h-[500px] flex-col gap-2">
      <LucideShoppingBag width={92} height={92} strokeWidth={1.5} />
      <h2 className="font-semibold text-black text-2xl">{t('emptyTitle')}</h2>
      <p className="text-zinc-500">{t('addFavorites')}</p>
      <Link href="/" className={buttonVariants() + ' mt-2'}>
        {t('goToShopping')}
      </Link>
    </div>
  )
}

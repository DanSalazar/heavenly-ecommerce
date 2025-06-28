import { getTranslations } from 'next-intl/server'
import SuccessContent from './success-content'
import { getBag } from '@/data/bag'
import { redirect } from 'next/navigation'

export async function generateMetadata() {
  const t = await getTranslations('metadata.success')
  return {
    title: t('title')
  }
}

export default async function Page() {
  const bag = await getBag()

  if (bag.length > 0) {
    redirect('/')
  }

  return <SuccessContent />
}

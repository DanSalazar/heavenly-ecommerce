import { getTranslations } from 'next-intl/server'
import SuccessContent from './success-content'

export async function generateMetadata() {
  const t = await getTranslations('metadata.success')
  return {
    title: t('title')
  }
}

export default function Page() {
  return <SuccessContent />
}

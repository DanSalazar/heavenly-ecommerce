import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import FavoritesWrapper from './_components/favorites-wrapper'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('metadata.favorites')
  return {
    title: t('title'),
    description: t('description')
  }
}

export default function Page() {
  return (
    <>
      <BreadcrumbWrapper />
      <FavoritesWrapper />
    </>
  )
}

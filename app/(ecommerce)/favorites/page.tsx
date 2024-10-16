import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import FavoritesWrapper from './_components/favorites-wrapper'

export const metadata = {
  title: 'Your Favorites Products',
  description: 'View and manage your favorite products in one place.'
}

export default function Page() {
  return (
    <>
      <BreadcrumbWrapper />
      <FavoritesWrapper />
    </>
  )
}

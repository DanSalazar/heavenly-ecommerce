import { useQuery } from '@tanstack/react-query'
import { HeartIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import ProductsWrapper from '@/components/ecommerce/products-wrapper'
import ProductComponent from '@/components/ecommerce/product-component'
import { ProductsWrapperSkeleton } from '@/components/skeletons'
import { useEffect, useState } from 'react'
import { getFavorites } from '@/data/favorites'
import { useTranslations } from 'next-intl'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const t = useTranslations('favorites')

  useEffect(() => {
    const ids = window.localStorage.getItem('items_saved')

    if (ids) {
      setFavorites(JSON.parse(ids))
    }
  }, [])

  const {
    isPending,
    error,
    data: favProducts
  } = useQuery({
    queryKey: ['favProducts', favorites],
    queryFn: async () => getFavorites(favorites)
  })

  if (isPending)
    return (
      <Layout>
        <ProductsWrapperSkeleton />
      </Layout>
    )

  if (error) return <div>{t('error')}</div>

  if (!favProducts.length)
    return (
      <main className="flex text-center items-center justify-center h-[450px] flex-col gap-2">
        <HeartIcon width={48} height={48} />
        <h2 className="font-semibold text-2xl">{t('emptyTitle')}</h2>
        <p className="text-zinc-500">{t('emptySubtitle')}</p>
        <Link
          href="/"
          className={buttonVariants({ variant: 'outline' }) + ' mt-2'}>
          {t('goToShopping')}
        </Link>
      </main>
    )

  return (
    <Layout>
      <ProductsWrapper>
        {favProducts.map(product => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </ProductsWrapper>
    </Layout>
  )
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('favorites')
  return (
    <main className="flex flex-col gap-8 mt-8">
      <h2 className="text-7xl md:text-8xl font-medium uppercase break-words">
        {t('title')}
      </h2>
      {children}
    </main>
  )
}

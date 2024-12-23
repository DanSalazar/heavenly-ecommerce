import { useQuery } from '@tanstack/react-query'
import { HeartIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import ProductsWrapper from '@/components/ecommerce/products-wrapper'
import ProductComponent from '@/components/ecommerce/product-component'
import { ProductsWrapperSkeleton } from '@/components/skeletons'
import { useEffect, useState } from 'react'
import { getFavorites } from '@/data/favorites'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

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

  if (error) return <div>Error has ocurred</div>

  if (!favProducts.length)
    return (
      <main className="flex text-center items-center justify-center h-[450px] flex-col gap-2">
        <HeartIcon width={48} height={48} />
        <h2 className="font-semibold text-2xl">Your favorite list is empty</h2>
        <p className="text-zinc-500">Add your favorite items in it.</p>
        <Link
          href="/"
          className={buttonVariants({ variant: 'outline' }) + ' mt-2'}>
          Go to Shopping
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

const Layout = ({ children }: { children: React.ReactNode }) => (
  <main className="flex flex-col gap-8 mt-8">
    <h2 className="text-7xl md:text-8xl font-medium uppercase break-words">
      Favorites
    </h2>
    {children}
  </main>
)

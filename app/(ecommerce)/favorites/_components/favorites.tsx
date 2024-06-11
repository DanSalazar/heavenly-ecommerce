import { useQuery } from '@tanstack/react-query'
import ProductComponent from '@/components/ecommerce/product'
import { HeartIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { getFavorites } from '@/server/actions'
import { getItemsFromLocal } from '@/utils'
import Link from 'next/link'

export default function Favorites() {
  const {
    isPending,
    error,
    data: favProducts
  } = useQuery({
    queryKey: ['favProducts'],
    queryFn: async () => {
      const ids = getItemsFromLocal()
      const data = await getFavorites(ids)
      return data
    }
  })

  if (isPending) return <div>Loading...</div>

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
    <main className="flex flex-col gap-8 mt-8">
      <h2 className="text-7xl md:text-8xl font-medium uppercase break-words">
        Favorites
      </h2>
      <div className="flex flex-wrap gap-4 border-t py-4 border-zinc-200">
        {favProducts.map(product => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

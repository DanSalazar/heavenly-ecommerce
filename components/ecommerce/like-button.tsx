import { useEffect, useState } from 'react'
import { HeartIcon, HeartIconSolid } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function LikeButton({ productId }: { productId: string }) {
  const [like, setLike] = useState(false)

  useEffect(() => {
    const favorites = window.localStorage.getItem('items_saved')

    if (favorites) {
      const favoritesList = JSON.parse(favorites) as string[]
      setLike(favoritesList.includes(productId))
    }
  }, [productId])

  const handleLike = () => {
    const favorites = window.localStorage.getItem('items_saved')
    const favoritesList = favorites ? (JSON.parse(favorites) as string[]) : []

    if (!like) {
      setLike(true)
      favoritesList.push(productId)
      window.localStorage.setItem('items_saved', JSON.stringify(favoritesList))
      return
    }

    setLike(false)
    window.localStorage.setItem(
      'items_saved',
      JSON.stringify(favoritesList.filter(id => id !== productId))
    )
  }

  return (
    <Button
      onClick={handleLike}
      className={cn('h-full w-20 group')}
      type="button"
      variant={'outline'}>
      <div className="relative">
        {like ? (
          <HeartIconSolid
            width={24}
            height={24}
            className={cn('text-red-500 animate-heart')}
          />
        ) : (
          <HeartIcon width={24} height={24} />
        )}
      </div>
    </Button>
  )
}

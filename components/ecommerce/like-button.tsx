'use client'

import { useState } from 'react'
import { HeartIcon, HeartIconSolid } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isInFavorites, removeItemFromLocal, saveItemInLocal } from '@/utils'

export default function LikeButton({ productId }: { productId: string }) {
  const [like, setLike] = useState(false)
  const isLiked = isInFavorites(productId)

  const handleLike = () => {
    if (!isLiked && !like) {
      setLike(true)
      saveItemInLocal(productId)
      return
    }

    setLike(false)
    removeItemFromLocal(productId)
  }

  return (
    <Button
      onClick={handleLike}
      className={cn('h-full border-primary/40 w-20 group')}
      type="button"
      variant={'outline'}>
      <div className="relative">
        <HeartIcon width={24} height={24} />
        <HeartIconSolid
          width={24}
          height={24}
          className={cn(
            'scale-0 group-hover:scale-100 absolute inset-0 text-red-500 transition-transform duration-200',
            {
              'scale-100': like
            }
          )}
        />
      </div>
    </Button>
  )
}

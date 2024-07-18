'use client'

import { addProductInBag } from '@/server/actions'
import { useSearchParams } from 'next/navigation'
import ButtonAddBag from './button-add-bag'
import PickColor from './pick-color'
import PickSize from './pick-size'
import { ProductVariantWithJoins } from '@/db/schema'
import LikeButton from './like-button'

export default function AddToBag({
  variants,
  productId
}: {
  variants: ProductVariantWithJoins[]
  productId: string
}) {
  const searchParams = useSearchParams()
  const variantSelected = variants.find(
    product =>
      product.color?.name === searchParams.get('color') &&
      product.size?.name === searchParams.get('size')
  )
  const formAction = addProductInBag.bind(null, variantSelected?.id)

  return (
    <form action={formAction} className="flex flex-col gap-4 mt-4">
      <PickColor variants={variants} />
      <PickSize variants={variants} />
      <div className="flex h-12 flex-wrap gap-2">
        <ButtonAddBag
          variantSelected={!!variantSelected}
          isOutOfStock={variantSelected?.stock || 0}
        />
        <LikeButton productId={productId} />
      </div>
    </form>
  )
}

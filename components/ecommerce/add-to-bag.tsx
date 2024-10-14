'use client'

import { useSearchParams } from 'next/navigation'
import ButtonAddBag from './button-add-bag'
import { VariantsJoined } from '@/db/types'
import LikeButton from './like-button'
import useUrlState from '@/hooks/useUrlState'
import PickOption from './pick-option'
import ColorSelector from './color-selector'

export default function AddToBag({
  variants,
  productId
}: {
  variants: VariantsJoined[]
  productId: string
}) {
  const searchParams = useSearchParams()
  const variantSelected = variants.find(
    product =>
      product.color?.name === searchParams.get('color') &&
      product.size?.name === searchParams.get('size')
  )
  const { getState } = useUrlState()

  const sizes = [...new Set(variants.map(({ size }) => size?.name || ''))].map(
    size => {
      let isAvailable = true

      if (getState('color')) {
        isAvailable = !!variants.find(
          variant =>
            variant.color?.name === getState('color') &&
            variant.size?.name === size &&
            variant.stock > 0
        )
      }

      return {
        name: size,
        isAvailable
      }
    }
  )
  const colors = [
    ...new Set(
      variants.map(({ color }) => color?.name! + color?.hex_code! || '')
    )
  ].map(color => {
    let isAvailable = true
    const [name, hex_code] = color.split('#')

    if (getState('size')) {
      isAvailable = !!variants.find(
        variant =>
          variant.size?.name === getState('size') &&
          variant.color?.name === name &&
          variant.stock > 0
      )
    }

    return {
      name,
      hex_code: '#' + hex_code,
      isAvailable
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <ColorSelector colors={colors} />
      <PickOption optionName="Size" options={sizes} />
      <div className="flex h-12 flex-wrap gap-2">
        <ButtonAddBag
          variantSelectedId={variantSelected?.id}
          variantSelected={!!variantSelected}
          isOutOfStock={variantSelected?.stock === 0}
        />
        <LikeButton productId={productId} />
      </div>
    </div>
  )
}

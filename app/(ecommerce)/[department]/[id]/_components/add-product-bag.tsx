'use client'

import { addProductInBag } from '@/server/actions'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ButtonAddBag from './button-add-bag'
import PickColor from './pick-color'
import PickSize from './pick-size'
import { ProductVariantWithJoins } from '@/db/schema'
import LikeButton from './like-button'

export default function AddProductInBag({
  data,
  productId
}: {
  data: ProductVariantWithJoins[]
  productId: string
}) {
  const [errors, setErrors] = useState<{ color: boolean; size: boolean }>({
    color: false,
    size: false
  })
  const searchParams = useSearchParams()

  const cleanErrors = (key: 'color' | 'size') =>
    setErrors({ ...errors, [key]: false })

  const addProduct = async () => {
    const url = new URLSearchParams(searchParams)
    const color = url.get('color')
    const size = url.get('size')

    if (!color || !size) {
      setErrors({
        color: !color,
        size: !size
      })

      return
    }

    const productVariant = data.find(
      product => product.color?.name === color && product.size?.name === size
    )

    if (productVariant) {
      await addProductInBag(productVariant.id)
    }
  }

  return (
    <form action={addProduct} className="flex flex-col gap-4">
      <PickColor data={data} error={errors.color} cleanErrors={cleanErrors} />
      <PickSize data={data} error={errors.size} cleanErrors={cleanErrors} />
      <div className="flex h-10 flex-wrap gap-2">
        <ButtonAddBag />
        <LikeButton productId={productId} />
      </div>
      {(errors.size || errors.color) && (
        <div className="bg-red-50 p-4 rounded-md text-red-600 font-medium">
          Please select the size and colors options
        </div>
      )}
    </form>
  )
}

'use client'

import { addProductInBag } from '@/server/actions'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ButtonAddBag from './button-add-bag'
import { HeartIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import PickColor from './pick-color'
import PickSize from './pick-size'
import { ProductVariantWithJoins } from '@/db/schema'

export default function AddProductInBag({
  data
}: {
  data: ProductVariantWithJoins[]
}) {
  const [errors, setErrors] = useState<{ color: boolean; size: boolean }>({
    color: false,
    size: false
  })
  const searchParams = useSearchParams()

  const cleanErrors = (key: 'color' | 'size') =>
    setErrors({ ...errors, [key]: false })

  return (
    <form
      action={async () => {
        const url = new URLSearchParams(searchParams)
        const color = url.get('color')
        const size = url.get('size')

        if (!color && !size) {
          setErrors({
            color: true,
            size: true
          })
          return
        } else if (!color) {
          setErrors({ ...errors, color: true })
          return
        } else if (!size) {
          setErrors({ ...errors, size: true })
          return
        }

        const productVariant = data.find(
          product => product.color.name === color && product.size.name === size
        )

        if (productVariant) {
          await addProductInBag(productVariant.id)
        }
      }}
      className="flex flex-col gap-4">
      <PickColor data={data} error={errors.color} cleanErrors={cleanErrors} />
      <PickSize data={data} error={errors.size} cleanErrors={cleanErrors} />
      <div className="flex h-10 flex-wrap gap-2">
        <ButtonAddBag />
        <Button className="h-full" type="button" variant={'outline'}>
          <HeartIcon width={20} height={20} />
        </Button>
      </div>
      {(errors.size || errors.color) && (
        <div className="bg-red-50 p-4 rounded-md text-red-600 font-medium">
          Please select the size and colors options
        </div>
      )}
    </form>
  )
}

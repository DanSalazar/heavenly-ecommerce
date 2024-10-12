'use client'

import { Button } from '@/components/ui/button'
import { SpinnerStatus } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { useShoppingBagContext } from '../providers/shopping-bag-provider'
import { addProductInBag } from '@/actions/bag'

export default function ButtonAddBag({
  variantSelected,
  isOutOfStock,
  variantSelectedId
}: {
  variantSelected: boolean
  isOutOfStock: boolean
  variantSelectedId: number | undefined
}) {
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()
  const { handleOpen } = useShoppingBagContext()

  const buttonClasses = 'transition-opacity h-full flex-1 uppercase rounded-lg'
  const disabledClasses = 'cursor-not-allowed opacity-50 hover:opacity-50'

  if (!variantSelected || !variantSelectedId)
    return (
      <Button
        type="button"
        aria-label="Please select an option"
        aria-disabled
        className={cn(buttonClasses, disabledClasses)}>
        Add to bag
      </Button>
    )

  if (isOutOfStock)
    return (
      <Button
        type="button"
        aria-disabled
        className={cn(buttonClasses, disabledClasses)}>
        Out of Stock
      </Button>
    )

  const handleAdd = async () => {
    if (isPending) return

    setIsPending(true)
    const result = await addProductInBag(variantSelectedId)
    setIsPending(false)

    if (
      result?.serverError ||
      result?.validationErrors ||
      result?.data?.error
    ) {
      toast({
        title: 'Add to Bag Failed',
        description:
          result?.serverError ||
          result?.data?.error ||
          'Unable to add the selected item to your bag. Please try again. If the issue persists,  customer support.',
        variant: 'destructive'
      })

      return
    }

    handleOpen(true)
  }

  return (
    <Button
      onClick={handleAdd}
      aria-label="Add to cart"
      aria-disabled={isPending}
      className={cn(buttonClasses, {
        [disabledClasses]: isPending
      })}>
      {isPending ? <SpinnerStatus srOnly="Adding to bag..." /> : 'Add to bag'}
    </Button>
  )
}

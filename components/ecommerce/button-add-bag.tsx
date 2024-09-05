'use client'

import { Button } from '@/components/ui/button'
import { SpinnerStatus } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { addProductInBag } from '@/server/actions'
import { MouseEvent, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { useShoppingBagContext } from '../providers/shopping-bag-provider'

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
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  if (!variantSelected)
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

    if (result) {
      setIsPending(false)
      handleOpen(true)
      return
    } else {
      toast({
        title: 'Add to Bag Failed',
        description:
          'Unable to add the selected item to your bag. Please try again. If the issue persists, contact customer support.',
        variant: 'destructive'
      })
    }
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

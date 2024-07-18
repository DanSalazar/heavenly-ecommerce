'use client'

import { Button } from '@/components/ui/button'
import { SpinnerStatus } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'

export default function ButtonAddBag({
  variantSelected,
  isOutOfStock
}: {
  variantSelected: boolean
  isOutOfStock: number
}) {
  const { pending } = useFormStatus()
  const buttonClasses = 'transition-opacity h-full font-normal flex-1 uppercase'
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

  if (isOutOfStock === 0)
    return (
      <Button
        type="button"
        aria-disabled
        className={cn(buttonClasses, disabledClasses)}>
        Out of Stock
      </Button>
    )

  return (
    <Button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault()
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={cn(buttonClasses, {
        [disabledClasses]: pending
      })}>
      {pending ? <SpinnerStatus srOnly="Adding to bag..." /> : 'Add to bag'}
    </Button>
  )
}

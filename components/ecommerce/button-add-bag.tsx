'use client'

import { Button } from '@/components/ui/button'
import { SpinnerStatus } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { useShoppingBagContext } from '../providers/shopping-bag-provider'
import { addProductInBag } from '@/actions/bag'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('products')

  const buttonClasses = 'transition-opacity h-full flex-1 uppercase rounded-lg'
  const disabledClasses =
    'cursor-not-allowed opacity-90 hover:opacity-90 hover:bg-primary'

  if (!variantSelected || !variantSelectedId)
    return (
      <Button
        type="button"
        aria-label={t('selectOption')}
        aria-disabled
        className={cn(buttonClasses, disabledClasses)}>
        {t('addToBag')}
      </Button>
    )

  if (isOutOfStock)
    return (
      <Button
        type="button"
        aria-disabled
        className={cn(buttonClasses, disabledClasses)}>
        {t('outOfStock')}
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
        title: t('addToBagFailed'),
        description:
          result?.serverError || result?.data?.error || t('addToBagError'),
        variant: 'destructive'
      })

      return
    }

    handleOpen(true)
  }

  return (
    <Button
      onClick={handleAdd}
      aria-label={t('addToBag')}
      aria-disabled={isPending}
      className={cn(buttonClasses, {
        [disabledClasses]: isPending
      })}>
      {isPending ? (
        <SpinnerStatus color="dark" srOnly={t('addingToBag')} />
      ) : (
        t('addToBag')
      )}
    </Button>
  )
}

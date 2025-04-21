import { Button } from '@/components/ui/button'
import { SpinnerStatus } from '@/components/ui/spinner'
import { useFormStatus } from 'react-dom'
import { useTranslations } from 'next-intl'

export const StripeCheckoutButton = () => {
  const { pending } = useFormStatus()
  const t = useTranslations('checkout')

  return (
    <Button disabled={pending} type="submit" className="h-12 w-full">
      {pending ? (
        <SpinnerStatus srOnly={t('processing')}>
          {t('processing')}
        </SpinnerStatus>
      ) : (
        t('proceedToCheckout')
      )}
    </Button>
  )
}

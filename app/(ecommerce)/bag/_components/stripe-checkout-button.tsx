import { Button } from '@/components/ui/button'
import { SpinnerStatus } from '@/components/ui/spinner'
import { useFormStatus } from 'react-dom'

export const StripeCheckoutButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit" className="h-12 w-full">
      {pending ? (
        <SpinnerStatus srOnly="Processing checkout...">
          Processing...
        </SpinnerStatus>
      ) : (
        'PROCEED TO CHECKOUT'
      )}
    </Button>
  )
}

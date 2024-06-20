'use client'

import { Button } from '@/components/ui/button'
import { SpinnerStatus } from '@/components/ui/spinner'
import { useFormStatus } from 'react-dom'

export const CheckoutButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="h-10 w-full">
      {pending ? (
        <SpinnerStatus srOnly="Processing checkout...">
          Processing...
        </SpinnerStatus>
      ) : (
        'Checkout'
      )}
    </Button>
  )
}

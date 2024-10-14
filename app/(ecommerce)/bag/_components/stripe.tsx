'use client'

import { createSession } from '@/actions/stripe'
import { StripeCheckoutButton } from './stripe-checkout-button'
import { useToast } from '@/components/ui/use-toast'

export default function Stripe() {
  const { toast } = useToast()

  return (
    <form
      action={async () => {
        const session = await createSession()

        if (session?.error) {
          toast({
            title: 'Checkout Failed',
            description: session.error,
            variant: 'destructive'
          })
          return
        }

        if (session?.url) {
          window.location.href = session.url
        }
      }}>
      <StripeCheckoutButton />
    </form>
  )
}

'use client'

import { useToast } from '@/components/ui/use-toast'
import { createPayPalOrder } from '@/server/paypal'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function Paypal() {
  const { toast } = useToast()

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
      }}>
      <PayPalButtons
        className="z-0"
        style={{
          layout: 'horizontal',
          label: 'checkout',
          color: 'black',
          shape: 'rect',
          tagline: false
        }}
        createOrder={async () => {
          const data = await fetch('/api/paypal', {
            method: 'POST'
          })
          const { error, id } = await data.json()

          if (error) {
            return ''
          }

          return id
        }}
        onApprove={async (_data, actions) => {
          const order = await actions.order?.capture()
          const orderDetails = {
            customerName: order?.purchase_units![0].shipping?.name?.full_name!,
            customerEmail: order?.purchase_units![0].payee?.email_address!,
            amount: Number(order?.purchase_units![0].amount?.value),
            created_at: order?.create_time!
          }

          await createPayPalOrder(orderDetails)
          return
        }}
        onError={error => {
          if (
            typeof error.message === 'string' &&
            error.message.includes('Detected popup close')
          )
            return

          toast({
            title: 'Checkout Failed',
            description:
              'An error occurred during the PayPal transaction. Please try again.',
            variant: 'destructive'
          })
        }}
      />
    </PayPalScriptProvider>
  )
}

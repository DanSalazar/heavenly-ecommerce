'use client'

import { createOrders } from '@/actions/order'
import { CreateOrderType } from '@/actions/order-schema'
import { useToast } from '@/components/ui/use-toast'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'

export default function Paypal() {
  const { toast } = useToast()
  const router = useRouter()

  const generateErrorToast = () => {
    toast({
      title: 'Checkout Failed',
      description:
        'An error occurred during the PayPal transaction. Please try again.',
      variant: 'destructive'
    })
  }

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

          const orderDetails: CreateOrderType = {
            customer_name: order?.purchase_units![0].shipping?.name?.full_name!,
            customer_email: order?.purchase_units![0].payee?.email_address!,
            total_amount: Number(order?.purchase_units![0].amount?.value) * 100,
            payment_method: 'paypal'
          }

          const result = await createOrders(orderDetails)

          if (result?.serverError || result?.validationErrors) {
            generateErrorToast()
            return
          }

          router.push('/success')
        }}
        onError={error => {
          if (
            typeof error.message === 'string' &&
            error.message.includes('Detected popup close')
          )
            return

          generateErrorToast()
        }}
      />
    </PayPalScriptProvider>
  )
}

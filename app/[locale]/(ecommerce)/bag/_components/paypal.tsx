'use client'

import { createOrders } from '@/actions/order'
import { CreateOrderType } from '@/actions/order-schema'
import { useToast } from '@/components/ui/use-toast'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Paypal() {
  const [isLoading, setIsLoading] = useState(false)
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
    <>
      {isLoading && <Loading />}
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
        }}>
        <PayPalButtons
          className="z-0 border-lg"
          style={{
            layout: 'horizontal',
            label: 'checkout',
            color: 'white',
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
            setIsLoading(true)
            const order = await actions.order?.capture()

            const orderDetails: CreateOrderType = {
              customer_name:
                order?.purchase_units![0].shipping?.name?.full_name!,
              customer_email: order?.purchase_units![0].payee?.email_address!,
              total_amount:
                Number(order?.purchase_units![0].amount?.value) * 100,
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
          onCancel={() => {
            setIsLoading(false)
          }}
        />
      </PayPalScriptProvider>
    </>
  )
}

function Loading() {
  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  )
}

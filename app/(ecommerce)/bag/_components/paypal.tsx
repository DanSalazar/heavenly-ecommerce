'use client'

import { createPayPalOrder } from '@/server/paypal'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function Paypal() {
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
          color: 'gold',
          tagline: false
        }}
        createOrder={async () => {
          const data = await fetch('/api/paypal', {
            method: 'POST'
          })
          const { id } = await data.json()

          return id
        }}
        onApprove={async (data, actions) => {
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
      />
    </PayPalScriptProvider>
  )
}

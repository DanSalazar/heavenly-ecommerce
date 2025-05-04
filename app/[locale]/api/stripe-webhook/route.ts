import { createOrders } from '@/actions/order'
import { NextRequest } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_KEY!)
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')
  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig!, STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    return new Response(null, {
      status: 400
    })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object

      const result = await createOrders({
        customer_email: checkoutSessionCompleted.customer_details?.email!,
        customer_name: checkoutSessionCompleted.customer_details?.name!,
        total_amount: checkoutSessionCompleted.amount_total!,
        payment_method: checkoutSessionCompleted.payment_method_types[0]
      })

      if (result?.data?.error) {
        return new Response(JSON.stringify({ error: result.data.error }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      break
  }

  return new Response(null, {
    status: 200
  })
}

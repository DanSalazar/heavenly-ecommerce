import { db } from '@/db'
import { OrderType, order } from '@/db/schema'
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
      const orderObject: Omit<OrderType, 'id'> = {
        order_created_at: new Date().toISOString(),
        customer_name: checkoutSessionCompleted.customer_details?.name!,
        customer_email: checkoutSessionCompleted.customer_details?.email!,
        order_status: checkoutSessionCompleted.status!,
        payment_method: checkoutSessionCompleted.payment_method_types[0],
        total_amount: checkoutSessionCompleted.amount_total!
      }

      await db.insert(order).values(orderObject)
      break
  }

  return new Response(null, {
    status: 200
  })
}

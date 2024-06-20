'use server'

import { db } from '@/db'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_KEY!)

interface PriceData {
  currency: 'usd'
  product_data: {
    name: string
    images: string[]
    description: string
  }
  unit_amount: number
}

type LineItem = {
  price_data: PriceData
  quantity: number
}

export const createSession = async () => {
  const bagItem = await db.query.bagItem.findMany({
    with: {
      product_variant: {
        with: {
          product: true,
          size: true,
          color: true
        }
      }
    }
  })

  const productsMap: LineItem[] = bagItem?.map(
    ({ quantity, product_variant }) => {
      if (!product_variant || !product_variant.product) return {} as LineItem
      const { product: p } = product_variant

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: p.name,
            images: [p.image!],
            description: `Size: ${product_variant.size?.name?.toUpperCase()} / Color: ${product_variant.color?.name}`
          },
          unit_amount: p.price * 100
        },
        quantity: quantity || 1
      }
    }
  )

  let session

  try {
    session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/success',
      line_items: productsMap,
      mode: 'payment',
      billing_address_collection: 'required'
    })
  } catch (error) {
    return
  }

  if (session.url) redirect(session.url)
}

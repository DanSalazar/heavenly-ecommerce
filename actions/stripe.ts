'use server'

import { db } from '@/db'
import { capitalizeWord, getDiscountPrice } from '@/lib/utils'
import { cookies, headers } from 'next/headers'
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
  const url = 'http://' + (await headers()).get('host')
  const bagId = (await cookies()).get('bag_id')?.value

  if (!bagId) {
    return {
      error:
        'No items found in the bag. Please ensure you have added items to your bag before proceeding.'
    }
  }

  const bag = await db.query.bag.findFirst({
    where: ({ id }, { eq }) => eq(id, bagId),
    with: {
      bagItem: {
        with: {
          product_variant: {
            with: {
              product: {
                columns: {
                  name: true,
                  description: true,
                  price: true,
                  discount: true,
                  percentage_off: true,
                  thumbnail: true
                }
              },
              size: { columns: { name: true } },
              color: { columns: { name: true } }
            }
          }
        }
      }
    }
  })

  if (!bag || !bag.bagItem.length) {
    return {
      error: 'The bag is empty. Please check your bag and try again.'
    }
  }

  const lineItems: LineItem[] = bag.bagItem?.map(
    ({ quantity, product_variant }) => {
      const { product } = product_variant
      const amount = product.discount
        ? getDiscountPrice(product.price, product.percentage_off) * 100
        : product.price * 100

      return {
        price_data: {
          currency: 'usd' as const,
          product_data: {
            name: product.name,
            images: [product.thumbnail],
            description: `Size: ${product_variant.size?.name?.toUpperCase()} / Color: ${capitalizeWord(product_variant.color.name)} / 
            ${product.discount ? 'Discount:' + product.percentage_off + '%' : ''}
            `
          },
          unit_amount: amount
        },
        quantity: quantity
      }
    }
  )

  let session

  try {
    session = await stripe.checkout.sessions.create({
      success_url: url + '/success',
      cancel_url: url + '/bag',
      line_items: lineItems,
      mode: 'payment'
    })
  } catch (error) {
    return {
      error:
        'An error occurred while creating the checkout session. Please try again later.'
    }
  }

  if (session.url)
    return {
      url: session.url
    }
}

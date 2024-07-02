import { NextRequest, NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'
import { db } from '@/db'

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_SECRET!
)
const client = new paypal.core.PayPalHttpClient(environment)

export async function POST(req: NextRequest) {
  const request = new paypal.orders.OrdersCreateRequest()
  const bagItem = await db.query.bagItem.findMany({
    with: {
      product_variant: {
        with: {
          product: true
        }
      }
    }
  })

  const totalAmount = bagItem.reduce((a, item) => {
    return a + item.product_variant.product?.price! * item.quantity!
  }, 0)

  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: `${totalAmount}.00`,
          //@ts-ignore
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: `${totalAmount}.00`
            }
          }
        },
        //@ts-ignore
        items: bagItem.map(item => ({
          name: item.product_variant.product?.name!,
          description: item.product_variant.product?.description!,
          unit_amount: {
            currency_code: 'USD',
            value: `${item.product_variant.product?.price!}.00`
          },
          quantity: item.quantity + ''!
        }))
      }
    ]
  })

  const response = await client.execute(request)

  return NextResponse.json({
    id: response.result.id
  })
}

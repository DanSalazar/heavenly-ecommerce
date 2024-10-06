import { NextRequest, NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'
import { db } from '@/db'
import { getDiscountPrice } from '@/utils'

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_SECRET!
)
const client = new paypal.core.PayPalHttpClient(environment)

export async function POST(req: NextRequest) {
  const request = new paypal.orders.OrdersCreateRequest()
  const bagId = req.cookies.get('bag_id')?.value

  if (!bagId) {
    return NextResponse.json(
      {
        error:
          'No items found in the bag. Please ensure you have added items to your bag before proceeding.'
      },
      { status: 400 }
    )
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
              }
            }
          }
        }
      }
    }
  })

  if (!bag || !bag.bagItem.length) {
    return NextResponse.json(
      {
        error: 'The bag is empty. Please check your bag and try again.'
      },
      { status: 400 }
    )
  }

  try {
    bag.bagItem.forEach(({ product_variant, quantity }) => {
      if (quantity > product_variant.stock || product_variant.stock < 1) {
        throw new Error('Quantity exceeds available stock.')
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Quantity exceeds available stock.`
      },
      { status: 400 }
    )
  }

  const totalAmount = bag.bagItem.reduce(
    (acc, { product_variant, quantity }) => {
      const { discount, percentage_off, price } = product_variant.product
      const productPrice = discount
        ? getDiscountPrice(price, percentage_off)
        : price

      return acc + quantity * productPrice
    },
    0
  )

  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: `${totalAmount}`,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: `${totalAmount}`
            },
            discount: {
              currency_code: 'USD',
              value: '0'
            },
            shipping_discount: {
              currency_code: 'USD',
              value: '0'
            },
            shipping: {
              currency_code: 'USD',
              value: '0'
            },
            handling: {
              currency_code: 'USD',
              value: '0'
            },
            tax_total: {
              currency_code: 'USD',
              value: '0'
            },
            insurance: {
              currency_code: 'USD',
              value: '0'
            }
          }
        },
        items: bag.bagItem.map(item => ({
          name: item.product_variant.product.name,
          description: item.product_variant.product.description || '',
          unit_amount: {
            currency_code: 'USD',
            value: `${
              item.product_variant.product.discount
                ? getDiscountPrice(
                    item.product_variant.product.price,
                    item.product_variant.product.percentage_off
                  )
                : item.product_variant.product.price
            }`
          },
          quantity: item.quantity + '',
          category: 'PHYSICAL_GOODS'
        }))
      }
    ]
  })

  const response = await client.execute(request)

  return NextResponse.json({
    id: response.result.id
  })
}

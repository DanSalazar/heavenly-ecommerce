import 'server-only'
import { db } from '@/db'
import { getUser } from './auth'
import { cache } from 'react'

export const getOrdersLength = cache(async (query: Record<string, string>) => {
  if (!getUser()) throw new Error('Unauthorized access.')

  const orders = await db.query.order.findMany({
    where: (fields, { ilike, eq, and, or }) => {
      const { payment_method, customer_name, customer_email } = fields

      return and(
        query.payment ? eq(payment_method, query.payment) : undefined,
        query.q
          ? or(
              ilike(customer_name, query.q + '%'),
              ilike(customer_email, query.q + '%')
            )
          : undefined
      )
    }
  })

  return orders.length
})

export const getOrders = cache(
  async ({
    query,
    limit,
    offset
  }: {
    query: Record<string, string>
    limit?: number
    offset?: number
  }) => {
    if (!getUser()) throw new Error('Unauthorized access.')

    const orders = await db.query.order.findMany({
      where: (fields, { ilike, eq, and, or }) => {
        const { payment_method, customer_name, customer_email } = fields

        return and(
          query.payment ? eq(payment_method, query.payment) : undefined,
          query.q
            ? or(
                ilike(customer_name, query.q + '%'),
                ilike(customer_email, query.q + '%')
              )
            : undefined
        )
      },
      orderBy: ({ order_created_at }, { desc }) => desc(order_created_at),
      limit,
      offset
    })

    return orders
  }
)

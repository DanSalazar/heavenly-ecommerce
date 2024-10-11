import { db } from '@/db'
import { cache } from 'react'
import 'server-only'
import { getUser } from './auth'

export const getDashboardStats = cache(async () => {
  if (!getUser()) throw new Error('Unauthorized access.')

  const productsInStock = await db.query.productVariations.findMany({
    where: (field, { gte }) => gte(field.stock, 1)
  })
  const orders = await db.query.order.findMany({
    orderBy: (field, op) => op.desc(field.order_created_at)
  })
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.total_amount / 100,
    0
  )

  return {
    productsInStock: productsInStock.length,
    totalRevenue,
    orders
  }
})

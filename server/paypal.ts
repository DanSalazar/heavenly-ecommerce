'use server'

import { db } from '@/db'
import { OrderType, order } from '@/db/schema'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const orderDetailsSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().min(1),
  amount: z.number().min(1),
  created_at: z.string()
})

export const createPayPalOrder = async (
  orderDetails: z.infer<typeof orderDetailsSchema>
) => {
  const safeParse = orderDetailsSchema.safeParse(orderDetails)

  if (!safeParse.success) return
  const { customerName, customerEmail, amount, created_at } = safeParse.data

  const orderObject: Omit<OrderType, 'id'> = {
    order_created_at: created_at,
    customer_name: customerName,
    customer_email: customerEmail,
    order_status: 'complete',
    payment_method: 'paypal',
    total_amount: amount * 100
  }

  await db.insert(order).values(orderObject)

  redirect('success')
}

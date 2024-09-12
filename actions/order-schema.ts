import { z } from 'zod'

export const orderSchema = z.object({
  customer_name: z.string().max(255),
  customer_email: z.string().max(255),
  payment_method: z.string().max(255),
  total_amount: z.number().int().nonnegative()
})

export type CreateOrderType = z.infer<typeof orderSchema>

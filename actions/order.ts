'use server'

import { db } from '@/db'
import { OrderType, order } from '@/db/schema'
import { baseAction } from '@/lib/safe-action'
import { orderSchema } from './order-schema'
import { flattenValidationErrors } from 'next-safe-action'

export const createOrder = baseAction
  .schema(orderSchema, {
    handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors
  })
  .action(
    async ({
      parsedInput: {
        customer_name,
        customer_email,
        total_amount,
        payment_method
      }
    }) => {
      const orderObject: Omit<OrderType, 'id'> = {
        customer_name,
        customer_email,
        payment_method,
        total_amount: total_amount,
        order_created_at: new Date().toISOString(),
        order_status: 'complete'
      }

      try {
        await db.insert(order).values(orderObject)
      } catch (err: unknown) {
        if (err instanceof Error) {
          return `Failed to create order. Error: ${err.message}`
        }
      }

      return { data: true }
    }
  )

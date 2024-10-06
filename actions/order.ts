'use server'

import { db } from '@/db'
import { bag, order, productVariations } from '@/db/schema'
import { baseAction } from '@/lib/safe-action'
import { orderSchema } from './order-schema'
import { flattenValidationErrors } from 'next-safe-action'
import { cookies } from 'next/headers'
import { SQL, eq, inArray, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { OrderType } from '@/db/types'

interface StockUpdate {
  quantity: number
  product_variant: {
    id: number
  }
}

function updateProductsStockSQL(stockUpdates: StockUpdate[]): [number[], SQL] {
  const sqlChunks: SQL[] = []
  const ids: number[] = []

  sqlChunks.push(sql`(case`)

  for (const update of stockUpdates) {
    sqlChunks.push(
      sql`when ${productVariations.id} = ${update.product_variant.id} then ${productVariations.stock} - ${update.quantity}::integer`
    )
    ids.push(update.product_variant.id)
  }

  sqlChunks.push(sql`end)`)

  const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '))

  return [ids, finalSql]
}

export const createOrders = baseAction
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
      const bag_id = cookies().get('bag_id')?.value!

      const bagData = await db.query.bag.findFirst({
        where: ({ id }, { eq }) => eq(id, bag_id),
        columns: {},
        with: {
          bagItem: {
            columns: {
              quantity: true
            },
            with: {
              product_variant: {
                columns: {
                  id: true
                }
              }
            }
          }
        }
      })

      if (bagData?.bagItem.length) {
        try {
          const [ids, finalSql] = updateProductsStockSQL(bagData.bagItem)

          await db
            .update(productVariations)
            .set({ stock: finalSql })
            .where(inArray(productVariations.id, ids))
          await db.delete(bag).where(eq(bag.id, bag_id))

          cookies().delete('bag_id')
        } catch (error) {
          return { error: 'An error occurred while updating product stock.' }
        }
      }

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
          return { error: `Failed to create order. Error: ${err.message}` }
        }
      }

      revalidatePath('/')

      return { success: 'Order created successfully' }
    }
  )

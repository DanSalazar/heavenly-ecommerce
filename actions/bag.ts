'use server'

import { db } from '@/db'
import { bag, bagItem } from '@/db/schema'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { baseAction } from '@/lib/safe-action'
import { flattenValidationErrors } from 'next-safe-action'

const idSchema = z.coerce.number()

const getOrCreateBagId = async () => {
  const ck = await cookies()
  let bag_id = ck.get('bag_id')?.value

  if (!bag_id) {
    bag_id = crypto.randomUUID()
    await db.insert(bag).values({
      id: bag_id
    })

    ck.set('bag_id', bag_id, {
      path: '/'
    })
  }

  return bag_id
}

export const addProductInBag = baseAction
  .schema(idSchema)
  .action(async ({ parsedInput: id }) => {
    try {
      const bag_id = await getOrCreateBagId()

      await db
        .insert(bagItem)
        .values({
          bag_id,
          item_id: id,
          quantity: 1
        })
        .onConflictDoUpdate({
          target: [bagItem.bag_id, bagItem.item_id],
          set: { quantity: sql`${bagItem.quantity} + 1` }
        })

      revalidatePath('/[department]/[id]', 'page')

      return {
        success: 'Product has been successfully added to your shopping bag.'
      }
    } catch (err) {
      return {
        error:
          'Unable to add the selected item to your bag. Please try again. If the issue persists,  customer support.'
      }
    }
  })

const updateQuantitySchema = z.object({
  id: idSchema,
  quantity: z.coerce.number().min(1)
})

export const updateQuantityInBag = baseAction
  .schema(updateQuantitySchema, {
    handleValidationErrorsShape: async ve =>
      flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { id, quantity } }) => {
    try {
      await db.update(bagItem).set({ quantity }).where(eq(bagItem.id, id))

      revalidatePath('/bag')

      return { success: 'Quantity updated successfully.' }
    } catch (err) {
      return { error: 'An error occurred while updating the quantity.' }
    }
  })

export const removeProductFromBag = baseAction
  .schema(idSchema)
  .action(async ({ parsedInput: id }) => {
    try {
      await db.delete(bagItem).where(eq(bagItem.id, id))

      revalidatePath('/')

      return { success: 'Item deleted successfully.' }
    } catch (err) {
      return { error: 'An error occurred while deleting the item.' }
    }
  })

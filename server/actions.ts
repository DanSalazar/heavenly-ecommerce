'use server'

import { db } from '@/db'
import { bagItem, product } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const paramsResolver = z.enum(['men', 'women'])

export const getProducts = async (deparment: string) => {
  try {
    const parse = paramsResolver.parse(deparment)
    const data = await db
      .select()
      .from(product)
      .where(eq(product.department, parse))
    return data
  } catch (err) {
    return null
  }
}

export const getProductById = async (id: number) => {
  const data = await db.select().from(product).where(eq(product.id, id))

  return data[0]
}

const productInBagSchema = z.object({
  bagId: z.string(),
  productId: z.number(),
  quantity: z.number()
})

export const addProductInBag = async (
  bagId: string,
  productId: number,
  quantity: number
) => {
  const parse = productInBagSchema.parse({ bagId, productId, quantity })

  await db
    .insert(bagItem)
    .values({
      id: parse.bagId,
      productId: parse.productId,
      quantity: parse.quantity
    })
    .onConflictDoUpdate({
      target: bagItem.productId,
      set: { quantity: sql`heavenly_bag_item.quantity + 1` }
    })

  revalidatePath('/[department]/[id]', 'page')
}

export const getBag = async () => {
  const data = await db
    .select()
    .from(bagItem)
    .leftJoin(product, eq(bagItem.productId, product.id))
  return data
}

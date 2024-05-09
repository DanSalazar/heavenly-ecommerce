'use server'

import { db } from '@/db'
import { product } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getProducts = async () => {
  const data = await db.select().from(product)

  return data
}

export const getProductById = async (id: number) => {
  const data = await db.select().from(product).where(eq(product.id, id))

  return data[0]
}

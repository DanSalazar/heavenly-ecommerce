'use server'

import { db } from '@/db'
import { bagItem, product } from '@/db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const paramsResolver = z.enum(['men', 'women'])
const searchParamsSchema = z.record(z.string(), z.string())

const makeFiltersBySearchParams = (
  filters: z.infer<typeof searchParamsSchema>
) => {
  return Object.entries(filters)
    .map(([key, val]) => `${key} = '${val}'`)
    .join(' and ')
}

export const getProducts = async (deparment: string, searchParams: unknown) => {
  try {
    const parsedSearchParams = searchParamsSchema.parse(searchParams)
    const filtersByParams = makeFiltersBySearchParams(parsedSearchParams)
    const parse = paramsResolver.parse(deparment)

    const data = await db
      .select()
      .from(product)
      .where(
        filtersByParams.length
          ? and(eq(product.department, parse), sql.raw(filtersByParams))
          : eq(product.department, parse)
      )

    return data
  } catch (err) {
    return null
  }
}

export const getProductById = async (id: number) => {
  const data = await db.select().from(product).where(eq(product.id, id))

  return data[0]
}

// const productInBagSchema = z.object({
//   bagId: z.string(),
//   productId: z.number(),
//   quantity: z.number()
// })s

// export const addProductInBag = async (
//   bagId: string,
//   productId: number,
//   quantity: number
// ) => {
//   const parse = productInBagSchema.parse({ bagId, productId, quantity })

//   await db
//     .insert(bagItem)
//     .values({
//       id: parse.bagId,
//       productId: parse.productId,
//       quantity: parse.quantity
//     })
//     .onConflictDoUpdate({
//       target: bagItem.item_id,
//       set: { quantity: sql`heavenly_bag_item.quantity + 1` }
//     })

//   revalidatePath('/[department]/[id]', 'page')
// }

export const getBag = async () => {
  const data = await db
    .select()
    .from(bagItem)
  return data
}

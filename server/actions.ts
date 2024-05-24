'use server'

import { db } from '@/db'
import {
    BagWithProduct,
  Product,
  ProductVariantWithJoins,
  bagItem,
  product,
  productVariations
} from '@/db/schema'
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

export const getProducts = async (
  deparment: string,
  searchParams: unknown
) => {
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
    return []
  }
}

export const getProductById = async (
  id: string
) => {
  const data =
    await db.query.productVariations.findMany({
      columns: {
        id: true
      },
      where: eq(productVariations.product_id, id),
      with: {
        product: true,
        size: true,
        color: true,
        category: true
      }
    })

  return data
}

const productInBagSchema = z.object({
  productVariationId: z.number()
})

export const addProductInBag = async (productVariationId: number) => {
  try {
    const parse = productInBagSchema.parse({ productVariationId })

    await db
      .insert(bagItem)
      .values({
        item_id: parse.productVariationId,
        quantity: 1
      })
      .onConflictDoUpdate({
        target: bagItem.item_id,
        set: { quantity: sql`heavenly_bag_item.quantity + 1` }
      })

    revalidatePath('/[department]/[id]', 'page')
  } catch (err) {
    return null
  }
}

export const getBag = async () => {
  const data = await db.query.bagItem.findMany({
    with: {
      product_variant: {
        columns: {
          id: true
        },
        with: {
          product: true
        }
      }
    }
  })

  return data
}

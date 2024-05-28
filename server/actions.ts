'use server'

import { db } from '@/db'
import {
  Product,
  bagItem,
  category,
  color,
  product,
  productVariations,
  size
} from '@/db/schema'
import { SQL, and, eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const paramsResolver = z.enum(['men', 'women'])
const searchParamsSchema = z.record(z.string(), z.string())

const makeFiltersBySearchParams = (
  filters: z.infer<typeof searchParamsSchema>
) => {
  const conditions: SQL[] = []

  if (filters.category) conditions.push(eq(category.name, filters.category))
  if (filters.color) conditions.push(eq(color.name, filters.color))
  if (filters.size) conditions.push(eq(size.name, filters.size))

  return conditions
}

export const getProducts = async (deparment: string, searchParams: unknown) => {
  try {
    const parsedSearchParams = searchParamsSchema.parse(searchParams)
    const filtersByParams = makeFiltersBySearchParams(parsedSearchParams)
    const parsedDepartment = paramsResolver.parse(deparment)

    if (filtersByParams) {
      const data = await db
        .selectDistinctOn([category.name], {
          product: product,
          category: category.name,
          color: color.name,
          size: size.name
        })
        .from(productVariations)
        .leftJoin(product, eq(productVariations.product_id, product.id))
        .leftJoin(category, eq(productVariations.category_id, category.id))
        .leftJoin(color, eq(productVariations.color_id, color.id))
        .leftJoin(size, eq(productVariations.size_id, size.id))
        .where(
          and(eq(product.department, parsedDepartment), ...filtersByParams)
        )

      return data
    }

    const data = await db
      .selectDistinct({
        product: product
      })
      .from(productVariations)
      .innerJoin(product, eq(productVariations.product_id, product.id))
      .where(eq(product.department, parsedDepartment))

    return data
  } catch (err) {
    return []
  }
}

export const getProductById = async (id: string) => {
  const data = await db.query.productVariations.findMany({
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

export const getFilters = async () => {
  const categories = await db.query.category.findMany({})
  const colors = await db.query.color.findMany({})
  const sizes = await db.query.size.findMany({})

  return {
    categories,
    colors,
    sizes
  }
}

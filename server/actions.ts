'use server'

import { db } from '@/db'
import {
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
  if (filters.department) {
    const parsedDepartment = paramsResolver.parse(filters.department)
    conditions.push(eq(product.department, parsedDepartment))
  }

  return conditions
}

export const getProducts = async (department: string, searchParams: unknown) => {
  try {
    const parsedSearchParams = searchParamsSchema.parse(searchParams)
    const filtersByParams = makeFiltersBySearchParams(parsedSearchParams)
    const parsedDepartment = department.length ? paramsResolver.parse(department) : ''

    if (filtersByParams.length) {
      const data = await db
        .selectDistinctOn([product.id], {
          product: product,
          category: category.name,
          color: color.name,
          size: size.name
        })
        .from(productVariations)
        .innerJoin(product, eq(productVariations.product_id, product.id))
        .innerJoin(category, eq(productVariations.category_id, category.id))
        .innerJoin(color, eq(productVariations.color_id, color.id))
        .innerJoin(size, eq(productVariations.size_id, size.id))
        .where(
          parsedDepartment
          ? and(eq(product.department, parsedDepartment), ...filtersByParams)
          : and(...filtersByParams)
        )

      return data
    }

    if (parsedDepartment) {
      const data = await db
      .selectDistinct({
        product
      })
      .from(productVariations)
      .innerJoin(product, eq(productVariations.product_id, product.id))
      .where(eq(product.department, parsedDepartment))

      return data
    }

    const data = await db
      .selectDistinct({
        product
      })
      .from(productVariations)
      .innerJoin(product, eq(productVariations.product_id, product.id))

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

export const updateQuantityInBag = async (id: number, value: number) => {
  await 
    db.update(bagItem).set({ quantity: value }).where(eq(bagItem.id, id))

  revalidatePath('/bag')
}

export const deleteFromBag = async (id: number) => {
  await db.delete(bagItem).where(eq(bagItem.id,  id))
  revalidatePath('/bag')
}
'use server'

import { db } from '@/db'
import { category, color, product, productVariations, size } from '@/db/schema'
import { Product } from '@/db/types'
import {
  ordersByMap,
  makeFiltersBySearchParams,
  filtersSchema,
  departmentSchema
} from '@/db/utils'
import { and, asc, eq, inArray, sql } from 'drizzle-orm'
import { cache } from 'react'

export const getProducts = cache(async () => {
  return await db.query.product.findMany({
    with: {
      productVariations: {
        columns: {
          id: true,
          stock: true
        },
        with: {
          color: true,
          size: true
        }
      }
    }
  })
})

export const getProductsByDepartment = async ({
  department,
  offset,
  limit
}: {
  department: string
  offset?: number
  limit?: number
}) => {
  try {
    const parsedDepartment = departmentSchema.parse(department)

    const data = await db
      .select({
        product
      })
      .from(product)
      .where(eq(product.department, parsedDepartment))
      .limit(limit || 0)
      .offset(offset || 0)
      .orderBy(asc(product.name))

    return data
  } catch (err) {
    return []
  }
}

export const getProductBySearchParams = async ({
  department,
  searchParams,
  limit,
  offset
}: {
  department?: string
  searchParams: unknown
  limit?: number
  offset?: number
}) => {
  const parsedSearchParams = filtersSchema.parse(searchParams)
  const filtersByParams = makeFiltersBySearchParams(parsedSearchParams)
  const parsedDepartment = departmentSchema.safeParse(department)

  const data = await db
    .selectDistinct({
      product
    })
    .from(product)
    .leftJoin(category, eq(product.category_id, category.id))
    .leftJoin(productVariations, eq(product.id, productVariations.product_id))
    .leftJoin(color, eq(productVariations.color_id, color.id))
    .leftJoin(size, eq(productVariations.size_id, size.id))
    .where(
      parsedDepartment?.data
        ? and(eq(product.department, parsedDepartment.data), ...filtersByParams)
        : and(...filtersByParams)
    )
    .offset(offset || 0)
    .limit(limit || 0)
    .orderBy(ordersByMap[parsedSearchParams.order] || asc(product.name))

  return data
}

export const getProductsCount = async ({
  searchParams,
  department
}: {
  searchParams: unknown
  department?: string
}) => {
  const parsedSearchParams = filtersSchema.parse(searchParams)
  const filtersByParams = makeFiltersBySearchParams(parsedSearchParams)
  const parsedDepartment = departmentSchema.safeParse(department)

  const data = await db
    .selectDistinctOn([product.id, product.name, product.price], {
      product
    })
    .from(product)
    .leftJoin(category, eq(product.category_id, category.id))
    .leftJoin(productVariations, eq(product.id, productVariations.product_id))
    .leftJoin(color, eq(productVariations.color_id, color.id))
    .leftJoin(size, eq(productVariations.size_id, size.id))
    .where(
      parsedDepartment?.data
        ? and(eq(product.department, parsedDepartment.data), ...filtersByParams)
        : and(...filtersByParams)
    )
    .orderBy(ordersByMap[parsedSearchParams.order] || asc(product.name))

  return data.length
}

export const getFilters = async (ids: string[]) => {
  if (!ids.length) return null

  const minAndMaxPrice = await db
    .select({
      min: sql`min(${product.price})`,
      max: sql`max(${product.price})`
    })
    .from(product)
    .where(inArray(product.id, ids))

  const filters = await db.query.productVariations.findMany({
    columns: {},
    with: {
      color: true,
      size: true,
      product: {
        with: {
          category: {
            columns: {
              name: true
            }
          }
        }
      }
    },
    where: (field, { inArray }) => {
      return inArray(field.product_id, ids)
    }
  })

  const colors = [...new Set(filters.map(f => f.color.name))]
  const sizes = [...new Set(filters.map(f => f.size.name))]
  const categories = [...new Set(filters.map(f => f.product.category.name))]

  return {
    categories,
    colors,
    sizes,
    minAndMaxPrice: minAndMaxPrice[0]
      ? [minAndMaxPrice[0].min as number, minAndMaxPrice[0].max as number]
      : [0, 0]
  }
}

export const getFavorites = async (ids: string[]): Promise<Product[] | []> => {
  if (!ids.length) return []

  const data = await db.select().from(product).where(inArray(product.id, ids))
  return data
}

export const getNewProductFields = async () => {
  const categories = await db.query.category.findMany({})
  const colors = await db.query.color.findMany({})
  const size = await db.query.size.findMany({})

  return { categories, colors, size }
}

export const getDashboardStats = cache(async () => {
  const productsInStock = await db.query.productVariations.findMany({
    where: (field, { gte }) => gte(field.stock, 1)
  })
  const orders = await db.query.order.findMany({
    orderBy: (field, op) => op.desc(field.order_created_at)
  })
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.total_amount / 100,
    0
  )

  return {
    productsInStock: productsInStock.length,
    totalRevenue,
    orders
  }
})

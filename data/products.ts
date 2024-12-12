import 'server-only'
import { db } from '@/db'
import { category, color, product, productVariations, size } from '@/db/schema'
import {
  departmentSchema,
  makeFiltersByQuery,
  sortProductsBy
} from '@/db/utils'
import { and, asc, eq, inArray, sql } from 'drizzle-orm'
import { cache } from 'react'

export const getProducts = cache(
  async ({
    query,
    limit = 0,
    offset = 0
  }: {
    query: Record<string, string>
    limit?: number
    offset?: number
  }) => {
    const filterByParams = makeFiltersByQuery(query)
    const products = await db.query.product.findMany({
      where: (_fields, { and }) => and(...filterByParams),
      limit,
      offset
    })

    return products
  }
)

export const getAllProducts = cache(
  async ({
    query,
    limit,
    offset
  }: {
    query: Record<string, string>
    limit?: number
    offset?: number
  }) => {
    const filtersByQuery = makeFiltersByQuery(query)

    const data = await db
      .selectDistinct({
        product
      })
      .from(product)
      .leftJoin(category, eq(product.category_id, category.id))
      .leftJoin(productVariations, eq(product.id, productVariations.product_id))
      .leftJoin(color, eq(productVariations.color_id, color.id))
      .leftJoin(size, eq(productVariations.size_id, size.id))
      .where(and(...filtersByQuery))
      .offset(offset || 0)
      .limit(limit || 0)
      .orderBy(sortProductsBy[query.order] || asc(product.name))

    return data
  }
)

export const getFullProduct = cache(async (id: string) => {
  const product = await db.query.product.findFirst({
    where: ({ id: productId }, { eq }) => eq(productId, id),
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
      },
      images: true
    }
  })

  return product
})

export const getProductsWithVariants = cache(async () => {
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

export const getProductsByDepartment = cache(
  async ({
    department,
    offset = 0,
    limit = 0
  }: {
    department: string
    offset?: number
    limit?: number
  }) => {
    try {
      const parsedDepartment = departmentSchema.parse(department)
      const products = await db
        .select({
          product
        })
        .from(product)
        .where(eq(product.department, parsedDepartment))
        .limit(limit)
        .offset(offset)
        .orderBy(asc(product.name))

      return products
    } catch (err) {
      return []
    }
  }
)

export const getProductsByQuery = cache(
  async ({
    department,
    query,
    limit,
    offset
  }: {
    department?: string
    query: Record<string, string>
    limit?: number
    offset?: number
  }) => {
    const filtersByQuery = makeFiltersByQuery(query)
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
          ? and(
              eq(product.department, parsedDepartment.data),
              ...filtersByQuery
            )
          : and(...filtersByQuery)
      )
      .offset(offset || 0)
      .limit(limit || 0)
      .orderBy(sortProductsBy[query.order] || asc(product.name))

    return data
  }
)

export const getProductsLength = cache(
  async ({
    query,
    department
  }: {
    query: Record<string, string>
    department?: string
  }) => {
    const filtersByParams = makeFiltersByQuery(query)
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
          ? and(
              eq(product.department, parsedDepartment.data),
              ...filtersByParams
            )
          : and(...filtersByParams)
      )
      .orderBy(sortProductsBy[query.order] || asc(product.name))

    return data.length
  }
)

export const getFilters = cache(async (ids: string[]) => {
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
      ? [
          (minAndMaxPrice[0].min as number) / 100,
          (minAndMaxPrice[0].max as number) / 100
        ]
      : [0, 0]
  }
})

export const getNewProductFields = cache(async () => {
  const categories = await db.query.category.findMany({})
  const colors = await db.query.color.findMany({})
  const size = await db.query.size.findMany({})

  return { categories, colors, size }
})

export const getFeaturedProducts = cache(async () => {
  return await db.query.product.findMany({
    where: ({ featured }, { eq }) => eq(featured, true),
    limit: 4
  })
})

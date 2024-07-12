'use server'

import { db } from '@/db'
import {
  Product,
  ProductVariants,
  bagItem,
  category,
  color,
  product,
  productVariations,
  size
} from '@/db/schema'
import { SQL, and, asc, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm'
import { PgColumn } from 'drizzle-orm/pg-core'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { z } from 'zod'

const paramsResolver = z.enum(['men', 'women'])
const searchParamsSchema = z.record(z.string(), z.string())

const addMultipleConditions = (column: PgColumn, string: string) => {
  const sqlConditions: SQL[] = []

  for (const condition of string.split(',')) {
    sqlConditions.push(eq(column, condition))
  }

  const sqlQuery = or(...sqlConditions)

  return sqlQuery || sql.empty()
}

const orders: { [k: string]: SQL<unknown> } = {
  'low to high': asc(product.price),
  'high to low': desc(product.price)
}

const makeFiltersBySearchParams = (
  filters: z.infer<typeof searchParamsSchema>
) => {
  const conditions: SQL[] = []

  if (filters.category) {
    if (filters.category.includes(',')) {
      const multipleConditions = addMultipleConditions(
        category.name,
        filters.category
      )
      conditions.push(multipleConditions)
    } else {
      conditions.push(eq(category.name, filters.category))
    }
  }

  if (filters.color) {
    if (filters.color.includes(',')) {
      const multipleConditions = addMultipleConditions(
        color.name,
        filters.color
      )
      conditions.push(multipleConditions)
    } else {
      conditions.push(eq(color.name, filters.color))
    }
  }

  if (filters.size) {
    if (filters.size.includes(',')) {
      const multipleConditions = addMultipleConditions(size.name, filters.size)
      conditions.push(multipleConditions)
    } else {
      conditions.push(eq(size.name, filters.size))
    }
  }

  if (filters.department) {
    const parsedDepartment = paramsResolver.parse(filters.department)
    conditions.push(eq(product.department, parsedDepartment))
  }

  if (filters.search) {
    const sql = ilike(product.name, filters.search + '%')
    conditions.push(sql)
  }

  if (filters.status) {
    const enumSchema = z.enum(['active', 'archived'])
    const status = enumSchema.safeParse(filters.status)

    if (status.success) {
      conditions.push(eq(product.status, status.data))
    }
  }

  return conditions
}

export const getProducts = async (
  department: string,
  searchParams: unknown
) => {
  try {
    const parsedSearchParams = searchParamsSchema.parse(searchParams)
    const filtersByParams = makeFiltersBySearchParams(parsedSearchParams)
    const parsedDepartment = department.length
      ? paramsResolver.parse(department)
      : ''

    if (filtersByParams.length) {
      const data = await db
        .selectDistinctOn([product.id, product.name, product.price], {
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
        .orderBy(orders[parsedSearchParams.order] || asc(product.name))

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
        .orderBy(orders[parsedSearchParams.order] || asc(product.name))

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

export const deleteProduct = async (id: string) => {
  await db.delete(product).where(eq(product.id, id))
  await db.delete(productVariations).where(eq(productVariations.product_id, id))

  revalidatePath('/dashboard/products')
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
          product: true,
          size: true,
          color: true
        }
      }
    },
    orderBy: (bag, { asc }) => [asc(bag.created_at)]
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
  await db.update(bagItem).set({ quantity: value }).where(eq(bagItem.id, id))

  revalidatePath('/bag')
}

export const deleteItemFromBag = async (id: number) => {
  await db.delete(bagItem).where(eq(bagItem.id, id))
  revalidatePath('/')
  return true
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

export const createProduct = async (
  p: Product,
  variants: ProductVariants[]
) => {
  try {
    await db.insert(product).values(p)
    await db.insert(productVariations).values(variants)
  } catch (error) {
    return 'Error while creating product'
  }

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}

export const getDashboardStats = async () => {
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
}

export const getColors = cache(async () => {
  return await db.query.color.findMany({})
})

const newColorSchema = z
  .string({
    required_error: 'Color is required'
  })
  .min(1)
  .toLowerCase()

export const addNewColor = async (formData: FormData) => {
  const colorName = newColorSchema.safeParse(formData.get('name'))

  if (!colorName.success) {
    return colorName.error.issues[0].message
  }

  await db
    .insert(color)
    .values({
      name: colorName.data
    })
    .onConflictDoNothing()

  revalidatePath('/dashboard/products/new')
}

export const getSizes = cache(async () => {
  return await db.query.size.findMany({})
})

const newSizeSchema = z
  .string({
    required_error: 'Size is required'
  })
  .min(1)
  .toLowerCase()

export const addNewSize = async (formData: FormData) => {
  const sizeName = newSizeSchema.safeParse(formData.get('name'))

  if (!sizeName.success) {
    return sizeName.error.issues[0].message
  }

  await db
    .insert(size)
    .values({
      name: sizeName.data
    })
    .onConflictDoNothing()

  revalidatePath('/dashboard/products/new')
}

export const getCategories = cache(async () => {
  return await db.query.category.findMany({})
})

const newCategorySchema = z
  .string({
    required_error: 'Category is required'
  })
  .min(1)
  .toLowerCase()

export const addNewCategory = async (formData: FormData) => {
  const categoryName = newCategorySchema.safeParse(formData.get('name'))

  if (!categoryName.success) {
    return categoryName.error.issues[0].message
  }

  await db
    .insert(category)
    .values({
      name: categoryName.data
    })
    .onConflictDoNothing()

  revalidatePath('/dashboard/products/new')
}

const idSchema = z.coerce.number()

export const deleteCategory = cache(async (formData: FormData) => {
  const id = idSchema.safeParse(formData.get('id'))

  if (!id.success) return

  await db.delete(category).where(eq(category.id, id.data))
  revalidatePath('/dashboard/products/new-properties')
})

export const deleteColor = cache(async (formData: FormData) => {
  const id = idSchema.safeParse(formData.get('id'))

  if (!id.success) return

  await db.delete(color).where(eq(color.id, id.data))
  revalidatePath('/dashboard/products/new-properties')
})

export const deleteSize = cache(async (formData: FormData) => {
  const id = idSchema.safeParse(formData.get('id'))

  if (!id.success) return

  await db.delete(size).where(eq(size.id, id.data))
  revalidatePath('/dashboard/products/new-properties')
})

const orderQuerySchema = z.object({
  search: z.string().optional(),
  payment_method: z.enum(['card', 'paypal']).optional()
})

const validateAtLeastOneProperty = (data: z.infer<typeof orderQuerySchema>) => {
  return Object.keys(data).length > 0
}

const orderQuerySchemaRefined = orderQuerySchema.refine(
  validateAtLeastOneProperty,
  'At least one property is required'
)

const getOrdersQuery = async (
  customerSearch?: string | null,
  payment?: 'card' | 'paypal' | null
) => {
  return await db.query.order.findMany({
    where: (fields, { ilike, eq, and, or }) => {
      const { payment_method, customer_name, customer_email } = fields

      return and(
        payment ? eq(payment_method, payment) : undefined,
        customerSearch
          ? or(
              ilike(customer_name, customerSearch + '%'),
              ilike(customer_email, customerSearch + '%')
            )
          : undefined
      )
    }
  })
}

export const getOrders = async (searchParams: unknown) => {
  const searchParamsParsed = orderQuerySchemaRefined.safeParse(searchParams)

  if (!searchParamsParsed.success) {
    return await db.query.order.findMany({})
  }

  return await getOrdersQuery(
    searchParamsParsed.data.search,
    searchParamsParsed.data.payment_method
  )
}

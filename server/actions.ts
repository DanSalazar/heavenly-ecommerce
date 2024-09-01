'use server'

import { db } from '@/db'
import {
  ImageInsert,
  Product,
  ProductInsert,
  ProductVariantsInsert,
  bag,
  bagItem,
  category,
  color,
  imagesTable,
  product,
  productVariations,
  size
} from '@/db/schema'
import {
  ordersByMap,
  makeFiltersBySearchParams,
  filtersSchema,
  departmentSchema
} from '@/db/utils'
import { SQL, and, asc, eq, inArray, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { z } from 'zod'

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

export const deleteProduct = async (id: string) => {
  await db.delete(product).where(eq(product.id, id))
  await db.delete(productVariations).where(eq(productVariations.product_id, id))

  revalidatePath('/dashboard/products')
}

const variantsFields = z.object({
  stock: z.number(),
  color_id: z.number(),
  size_id: z.number(),
  product_id: z.string(),
  id: z.number().optional()
})
const updateProductVariantSchema = z.array(variantsFields)

export const updateProduct = async (
  id: string,
  product_values: Partial<ProductInsert> | null,
  variants_values: ProductVariantsInsert[] | null,
  images: ImageInsert[]
) => {
  const variantsParsed = updateProductVariantSchema.safeParse(variants_values)
  const updateSets: Record<string, SQL> = {}

  if (variantsParsed.success) {
    const fields = variantsFields
      .omit({ id: true, product_id: true })
      .keyof().options

    fields.forEach(field => {
      const sqlChunks: SQL[] = []
      sqlChunks.push(sql`(case`)

      for (const variant of variantsParsed.data) {
        // New product variant
        if (typeof variant.id !== 'undefined') {
          sqlChunks.push(
            sql`when ${productVariations.id} = ${variant.id} then ${variant[field]}::integer`
          )
        }
      }

      sqlChunks.push(sql`end)`)
      updateSets[field] = sql.join(sqlChunks, sql.raw(' '))
    })
  } else {
    return 'Something went wrong'
  }

  try {
    await db.transaction(async tx => {
      if (product_values) {
        await tx.update(product).set(product_values).where(eq(product.id, id))
      }

      if (variantsParsed.success) {
        await tx
          .insert(productVariations)
          .values(variantsParsed.data)
          .onConflictDoUpdate({
            target: productVariations.id,
            set: updateSets
          })
      }

      if (images.length) {
        await tx.insert(imagesTable).values(images)
      }
    })
  } catch (error) {
    return `Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`
  }

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}

export const getBag = cache(async () => {
  const bagId = cookies().get('bag_id')?.value || ''
  const bag = await db.query.bag.findFirst({
    where: (field, { eq }) => eq(field.id, bagId),
    with: {
      bagItem: {
        with: {
          product_variant: {
            columns: {
              id: true,
              stock: true
            },
            with: {
              product: true,
              size: true,
              color: true
            }
          }
        },
        orderBy: (bagItem, { asc }) => [asc(bagItem.created_at)]
      }
    }
  })

  return bag
})

const productInBagSchema = z.coerce.number()

export const addProductInBag = async (variantId: number | undefined) => {
  try {
    let bag_id = cookies().get('bag_id')?.value

    if (!bag_id) {
      bag_id = crypto.randomUUID()
      await db.insert(bag).values({
        id: bag_id
      })

      cookies().set('bag_id', bag_id, {
        path: '/'
      })
    }

    const item_id = productInBagSchema.parse(variantId)

    await db
      .insert(bagItem)
      .values({
        bag_id,
        item_id,
        quantity: 1
      })
      .onConflictDoUpdate({
        target: [bagItem.bag_id, bagItem.item_id],
        set: { quantity: sql`${bagItem.quantity} + 1` }
      })

    revalidatePath('/[department]/[id]', 'page')
  } catch (err) {
    return null
  }
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
  p: ProductInsert,
  variants: ProductVariantsInsert[],
  images: ImageInsert[]
) => {
  try {
    await db.transaction(async tx => {
      await tx.insert(product).values(p)
      await tx.insert(productVariations).values(variants)
      await tx.insert(imagesTable).values(images)
    })
  } catch (error) {
    return 'Error creating product'
  }

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
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

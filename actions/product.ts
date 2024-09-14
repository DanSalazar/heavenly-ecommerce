'use server'

import { eq, sql, SQL } from 'drizzle-orm'
import { db } from '@/db'
import {
  productVariations,
  imagesTable,
  product as ProductTable,
  product
} from '@/db/schema'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { safeAction } from '@/lib/safe-action'
import {
  imagesSchema,
  productSchema,
  productVariationsSchema,
  updateProductSchema
} from './product-schema'
import { redirect } from 'next/navigation'

const createProductSchema = z.object({
  product: productSchema,
  variants: z.array(productVariationsSchema.omit({ id: true })),
  images: z.array(imagesSchema.omit({ id: true }))
})

export const createProduct = safeAction
  .schema(createProductSchema)
  .action(async ({ parsedInput: { product, variants, images } }) => {
    try {
      await db.transaction(async tx => {
        await tx.insert(ProductTable).values(product)
        await tx.insert(productVariations).values(variants)
        await tx.insert(imagesTable).values(images)
      })
    } catch (error) {
      return {
        error:
          'Failed to create product. Please check your input and try again.'
      }
    }

    revalidatePath('/dashboard/products')
    redirect('/dashboard/products')
  })

export const deleteProduct = safeAction
  .schema(
    z.object({
      id: z.string().min(1)
    })
  )
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db.delete(product).where(eq(product.id, id))

      revalidatePath('/dashboard/products')

      return { success: 'Product deleted successfully' }
    } catch (error) {
      return { error: `Failed to delete product, please try again.` }
    }
  })

const updateProductFuncSchema = z.object({
  product: updateProductSchema.nullable(),
  variants: z.array(productVariationsSchema.partial({ id: true })).nullable(),
  images: z.array(imagesSchema.omit({ id: true })).nullable(),
  product_id: z.string()
})

export const updateProduct = safeAction
  .schema(updateProductFuncSchema)
  .action(
    async ({ parsedInput: { variants, product_id, images, product } }) => {
      const updateSets: Record<string, SQL> = {}

      if (variants?.length) {
        const keys = productVariationsSchema
          .omit({ id: true, product_id: true })
          .keyof().options

        keys.forEach(field => {
          const sqlChunks: SQL[] = []
          sqlChunks.push(sql`(case`)

          for (const variant of variants) {
            // Check if the variant has an id, indicating it's an existing variant to be updated
            if (typeof variant.id !== 'undefined') {
              sqlChunks.push(
                sql`when ${productVariations.id} = ${variant.id} then ${variant[field]}::integer`
              )
            }
          }

          sqlChunks.push(sql`end)`)
          updateSets[field] = sql.join(sqlChunks, sql.raw(' '))
        })
      }

      try {
        await db.transaction(async tx => {
          if (product) {
            await tx
              .update(ProductTable)
              .set(product)
              .where(eq(ProductTable.id, product_id))
          }

          if (variants?.length) {
            await tx
              .insert(productVariations)
              .values(variants)
              .onConflictDoUpdate({
                target: productVariations.id,
                set: updateSets
              })
          }

          if (images?.length) {
            await tx.insert(imagesTable).values(images)
          }
        })
      } catch (error) {
        return {
          error: `Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`
        } // {{ edit_2 }}
      }

      revalidatePath('/dashboard/products')
      redirect('/dashboard/products')
    }
  )
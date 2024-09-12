'use server'

import { eq } from 'drizzle-orm'
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
  productVariationsSchema
} from './product-schema'
import { redirect } from 'next/navigation'

const createProductSchema = z.object({
  product: productSchema,
  variants: z.array(productVariationsSchema),
  images: z.array(imagesSchema)
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
      return 'Error creating product'
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

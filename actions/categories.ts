'use server'

import { db } from '@/db'
import { category, color, size } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { safeAction } from '@/lib/safe-action'

const idSchema = z.coerce.number()

export const deleteCategory = safeAction
  .schema(idSchema)
  .action(async ({ parsedInput: id }) => {
    try {
      await db.delete(category).where(eq(category.id, id))
      revalidatePath('/dashboard/products/properties')
      return { success: 'Category successfully deleted.' }
    } catch (error) {
      return {
        error:
          'An error occurred while trying to delete the category. Please try again later.'
      }
    }
  })

export const deleteColor = safeAction
  .schema(idSchema)
  .action(async ({ parsedInput: id }) => {
    try {
      await db.delete(color).where(eq(color.id, id))
      revalidatePath('/dashboard/products/properties')
      return { success: 'Color successfully deleted.' }
    } catch (error) {
      return {
        error:
          'An error occurred while trying to delete the color. Please try again later.'
      }
    }
  })

export const deleteSize = safeAction
  .schema(idSchema)
  .action(async ({ parsedInput: id }) => {
    try {
      await db.delete(size).where(eq(size.id, id))
      revalidatePath('/dashboard/products/properties')
      return { success: 'Size successfully deleted.' }
    } catch (error) {
      return {
        error:
          'An error occurred while trying to delete the size. Please try again later.'
      }
    }
  })

const colorSchema = z.object({
  name: z.string().toLowerCase(),
  hex_code: z
    .string()
    .min(2)
    .max(7)
    .refine(hex_code => hex_code.includes('#'))
})

export const addNewColor = safeAction
  .schema(colorSchema)
  .action(async ({ parsedInput: colorData }) => {
    try {
      await db.insert(color).values(colorData).onConflictDoNothing()

      revalidatePath('/dashboard/products/new')
      return { success: 'New color successfully added.' }
    } catch (error) {
      return {
        error:
          'An error occurred while trying to add the new color. Please try again later.'
      }
    }
  })

const propertySchema = z.object({
  name: z.string().toLowerCase()
})
export const addNewSize = safeAction
  .schema(propertySchema)
  .action(async ({ parsedInput: { name } }) => {
    try {
      await db
        .insert(size)
        .values({
          name
        })
        .onConflictDoNothing()

      revalidatePath('/dashboard/products/new')
      return { success: 'New size successfully added.' }
    } catch (error) {
      return {
        error:
          'An error occurred while trying to add the new size. Please try again later.'
      }
    }
  })

export const addNewCategory = safeAction
  .schema(propertySchema)
  .action(async ({ parsedInput: { name } }) => {
    try {
      await db
        .insert(category)
        .values({
          name
        })
        .onConflictDoNothing()

      revalidatePath('/dashboard/products/new')
      return { success: 'New category successfully added.' }
    } catch (error) {
      return {
        error:
          'An error occurred while trying to add the new category. Please try again later.'
      }
    }
  })

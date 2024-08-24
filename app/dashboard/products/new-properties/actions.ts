'use server'

import { db } from '@/db'
import { category, color, size } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const idSchema = z.coerce.number()

export const deleteCategory = async (formData: FormData) => {
  const id = idSchema.safeParse(formData.get('id'))

  if (!id.success) return

  await db.delete(category).where(eq(category.id, id.data))
  revalidatePath('/dashboard/products/new-properties')
}

export const deleteColor = async (formData: FormData) => {
  const id = idSchema.safeParse(formData.get('id'))

  if (!id.success) return

  await db.delete(color).where(eq(color.id, id.data))
  revalidatePath('/dashboard/products/new-properties')
}

export const deleteSize = async (formData: FormData) => {
  const id = idSchema.safeParse(formData.get('id'))

  if (!id.success) return

  await db.delete(size).where(eq(size.id, id.data))
  revalidatePath('/dashboard/products/new-properties')
}

const newPropertySchema = z
  .string({
    required_error: 'Property name is required'
  })
  .min(1)
  .toLowerCase()

export const addNewColor = async (formData: FormData) => {
  const colorName = newPropertySchema.safeParse(formData.get('name'))

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

export const addNewSize = async (formData: FormData) => {
  const sizeName = newPropertySchema.safeParse(formData.get('name'))

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

export const addNewCategory = async (formData: FormData) => {
  const categoryName = newPropertySchema.safeParse(formData.get('name'))

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

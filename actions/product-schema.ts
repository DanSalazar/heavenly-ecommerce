import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().length(36),
  name: z.string().max(255),
  brand: z.string().max(50),
  description: z.string().optional(),
  price: z.number().int().nonnegative(),
  discount: z.boolean().default(false),
  percentage_off: z.number().int().nonnegative().max(100),
  thumbnail: z.string(),
  department: z.enum(['men', 'women']),
  status: z.enum(['active', 'archived']),
  created_at: z.string().max(27),
  featured: z.boolean().default(false),
  category_id: z.number().int().nonnegative()
})

export type ProductSchema = z.infer<typeof productSchema>
export const updateProductSchema = productSchema.partial()
export type UpdateProductType = z.infer<typeof updateProductSchema>

export const productVariationsSchema = z.object({
  id: z.number().int().nonnegative(),
  product_id: z.string().length(36),
  color_id: z.number().int().nonnegative(),
  size_id: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative()
})

export const imagesSchema = z.object({
  id: z.number().int().nonnegative(),
  key: z.string().max(255),
  src: z.string().max(255),
  alt: z.string().max(255),
  name: z.string().max(255),
  created_at: z.string().max(27),
  product_id: z.string().length(36)
})

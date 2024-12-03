import { Control } from 'react-hook-form'
import { z } from 'zod'

export const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(1),
  brand: z
    .string({
      required_error: 'Brand is required'
    })
    .min(1)
    .max(50),
  description: z.string().optional(),
  price: z.coerce
    .number({
      required_error: 'Price is required'
    })
    .min(1, {
      message: 'Price must be greater than or equal to 1'
    }),
  discount: z.coerce.number().max(99).optional(),
  variants: z
    .array(
      z.object({
        stock: z.coerce.number().max(99),
        color: z.string({ required_error: 'Color is required' }),
        size: z.string({ required_error: 'Size is required' }),
        ownId: z.number().optional(),
        id: z.number().optional()
      })
    )
    .min(1, {
      message: 'You must add at least one variant'
    }),
  category: z.string({ required_error: 'Category is required' }),
  department: z.enum(['men', 'women'], {
    required_error: 'Department is required'
  }),
  archived: z.boolean(),
  featured: z.boolean()
})

export type FormSchema = z.infer<typeof formSchema>
export type FormControl = Control<FormSchema>

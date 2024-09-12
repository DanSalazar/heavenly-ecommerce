import { z } from 'zod'

export const socialMediaSchema = z.object({
  facebook: z.string().max(255).optional(),
  instagram: z.string().max(255).optional(),
  x: z.string().max(255).optional()
})

export type SocialMediaInsert = z.infer<typeof socialMediaSchema>

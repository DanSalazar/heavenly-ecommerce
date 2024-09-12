'use server'

import { safeAction } from '@/lib/safe-action'
import { socialMediaSchema } from './social-media-schema'
import { db } from '@/db'
import { shopInformation } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const updateSocialMedia = safeAction
  .schema(socialMediaSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const infoUpdated = await db
        .update(shopInformation)
        .set(data)
        .where(eq(shopInformation.id, Number(process.env.SHOP_INFORMATION_ID)))
        .returning()

      if (!infoUpdated[0]?.id) {
        return { error: 'Failed to update shop information' }
      }

      return { success: 'Shop information updated' }
    } catch (error) {
      return {
        error: `Failed to update: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  })

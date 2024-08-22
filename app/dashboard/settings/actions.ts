'use server'

import { db } from '@/db'
import { shopInformation, ShopInformationInsert } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const addShopInformation = async (data: ShopInformationInsert) => {
  const infoUpdated = await db
    .update(shopInformation)
    .set(data)
    .where(eq(shopInformation.id, Number(process.env.SHOP_INFORMATION_ID)))
    .returning()

  if (!infoUpdated[0]?.id) {
    return { error: 'Failed to update shop information' }
  }

  return { success: 'Shop information updated' }
}

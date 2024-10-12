'use server'

import { db } from '@/db'
import { cache } from 'react'

export const getFavorites = cache(async (ids: string[]) => {
  if (!ids.length) return []
  const favorites = await db.query.product.findMany({
    where: ({ id }, { inArray }) => inArray(id, ids)
  })

  return favorites
})

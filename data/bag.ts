import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { db } from '@/db'
import { BagItem } from '@/db/types'

export const getBag = cache(async (): Promise<BagItem[]> => {
  const bagId = (await cookies()).get('bag_id')?.value || ''

  const bag = await db.query.bag.findFirst({
    where: (field, { eq }) => eq(field.id, bagId),
    with: {
      bagItem: {
        columns: {
          item_id: false,
          bag_id: false
        },
        with: {
          product_variant: {
            columns: {
              id: true,
              stock: true
            },
            with: {
              product: true,
              size: true,
              color: true
            }
          }
        },
        orderBy: (bagItem, { asc }) => [asc(bagItem.created_at)]
      }
    }
  })

  return bag?.bagItem || []
})

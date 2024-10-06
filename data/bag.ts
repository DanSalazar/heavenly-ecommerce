import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { db } from '@/db'

export const getBag = cache(async () => {
  const bagId = cookies().get('bag_id')?.value || ''

  const bag = await db.query.bag.findFirst({
    where: (field, { eq }) => eq(field.id, bagId),
    with: {
      bagItem: {
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

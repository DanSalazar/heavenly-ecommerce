'use server'

import { db } from '@/db'
import { imagesTable } from '@/db/schema'
import { safeAction } from '@/lib/safe-action'
import { eq, inArray } from 'drizzle-orm'
import { UTApi } from 'uploadthing/server'
import { z } from 'zod'

const utapi = new UTApi()

const deleteFilesSchema = z.array(z.string()).or(z.string())

export const deleteFilesAction = safeAction
  .schema(deleteFilesSchema)
  .action(async ({ parsedInput: keys }) => {
    try {
      const data = await utapi.deleteFiles(keys)

      if (data.success) {
        if (typeof keys === 'string') {
          await db.delete(imagesTable).where(eq(imagesTable.key, keys))
        } else {
          await db
            .delete(imagesTable)
            .where(inArray(imagesTable.key, keys))
            .returning()
        }
        return {
          success: 'Files successfully deleted.'
        }
      } else throw new Error('')
    } catch (error) {
      return {
        error:
          'An error occurred while trying to delete the files. Please try again later.'
      }
    }
  })

'use server'

import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export const deleteFiles = async (keys: string | string[]) => {
  const result = await utapi.deleteFiles(keys)

  if (!result.success) return false

  return true
}

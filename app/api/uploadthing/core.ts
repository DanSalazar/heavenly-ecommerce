import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '1024MB', maxFileCount: 8 } })
    .middleware(async () => {
      const { userId } = auth()

      if (!userId) throw new UploadThingError('Unauthorized')

      return { userId }
    })

    .onUploadComplete(async ({ metadata, file: _ }) => {
      return { uploadedBy: metadata.userId }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

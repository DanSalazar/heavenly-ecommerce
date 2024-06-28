import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

const auth = (req: Request) => ({ id: 'fakeId' }) // Fake auth function

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '1MB' } })
    .middleware(async ({ req }) => {
      const user = auth(req)

      if (!user) throw new UploadThingError('Unauthorized')

      return { userId: user.id }
    })

    .onUploadComplete(async ({ metadata, file: _ }) => {
      return { uploadedBy: metadata.userId }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

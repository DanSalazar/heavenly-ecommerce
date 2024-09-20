import { ImageInsertNoProductId } from '@/db/schema'

export type ImagesState = {
  pendingImages: ImageInsertNoProductId[]
  uploadedImages: ImageInsertNoProductId[]
  productImages?: ImageInsertNoProductId[]
}

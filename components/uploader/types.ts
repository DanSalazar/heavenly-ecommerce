import { ImageInsertNoProductId } from '@/db/types'

export type ImagesState = {
  pendingImages: ImageInsertNoProductId[]
  uploadedImages: ImageInsertNoProductId[]
  productImages?: ImageInsertNoProductId[]
}

export type UploaderProps = {
  addImages: (files: ImageInsertNoProductId[], uploaded: boolean) => void
  cancelPendingImages: () => void
  deleteFile: (key: string, src?: string) => void
  setThumbnail: (src: string) => void
  images: ImagesState
  thumbnail: string
}

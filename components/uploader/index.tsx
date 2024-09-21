'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useUploadThing } from '@/lib/uploadthing'
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes
} from 'uploadthing/client'
import { cn } from '@/lib/utils'
import { ImageItem, UploadImage, UploadImagePending } from './images'
import { Button } from '../ui/button'
import { SCROLLBAR_CLASS } from '@/lib/constants'
import { ImageInsertNoProductId } from '@/db/schema'
import { ImagesState } from './types'
import { useDropzone } from '@uploadthing/react'
import { useToast } from '../ui/use-toast'

interface UploaderProps {
  addImages: (files: ImageInsertNoProductId[], uploaded: boolean) => void
  cancelPendingImages: () => void
  deleteFile: (key: string, src?: string) => void
  setThumbnail: (src: string) => void
  images: ImagesState
  thumbnail: string
}

const getGridClass = (imageCount: number) => {
  switch (imageCount) {
    case 1:
      return 'md:grid-cols-1'
    case 2:
      return 'md:grid-cols-2'
    default:
      return 'md:grid-cols-3'
  }
}

export default function Uploader({
  addImages,
  cancelPendingImages,
  setThumbnail,
  deleteFile,
  images,
  thumbnail
}: UploaderProps) {
  const { toast } = useToast()

  const { startUpload, routeConfig } = useUploadThing('imageUploader', {
    onClientUploadComplete: response => {
      const images: ImageInsertNoProductId[] = response.map(image => ({
        src: image.url,
        key: image.key,
        alt: image.name,
        name: image.name,
        created_at: new Date().toISOString()
      }))

      addImages(images, true)
    },
    onUploadError: error => {
      let description =
        (error.cause as any)?.message === 'Invalid config: FileSizeMismatch'
          ? 'The uploaded files exceed the maximum allowed size.'
          : error.message

      toast({
        title: 'Upload Error',
        variant: 'destructive',
        description
      })

      cancelPendingImages()
    }
  })

  const uploaderClassName =
    'flex flex-col gap-1 border border-dashed border-zinc-800 rounded-lg p-6 text-center hover:border-blue-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer'
  const gridClass = getGridClass(
    images.pendingImages.length +
      images.uploadedImages.length +
      Number(images.productImages?.length)
  )

  const maxFileCount = routeConfig?.image?.maxFileCount || 8
  const disabled =
    images.uploadedImages.length + images.pendingImages.length > maxFileCount

  const onDrop = (acceptedFiles: File[]) => {
    if (images.uploadedImages.length + acceptedFiles.length > maxFileCount) {
      toast({
        title: 'Upload Error',
        description: `You cannot add more than ${maxFileCount} images. Currently, you have ${images.uploadedImages.length} uploaded and are trying to add ${acceptedFiles.length}.`,
        variant: 'destructive'
      })
      return
    }
    // Filter out files that are already pending upload to avoid duplicate uploads
    const files = acceptedFiles.filter(
      ({ name }) => !images.pendingImages.some(file => file.name === name)
    )

    const filesToImageType: ImageInsertNoProductId[] = files.map(file => ({
      src: '',
      alt: '',
      key: '',
      created_at: new Date().toISOString(),
      name: file.name
    }))

    addImages(filesToImageType, false)
    startUpload(files)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    )
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Manage Product Images</Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          'max-w-[700px] max-h-[85%] overflow-y-auto',
          SCROLLBAR_CLASS
        )}>
        <DialogHeader>
          <DialogTitle className="text-3xl">Product Images</DialogTitle>
          <DialogDescription>Manage your product images</DialogDescription>
        </DialogHeader>

        <div className="">
          <h3
            className={cn('text-sm font-medium', {
              'mb-4': images.pendingImages.length + images.uploadedImages.length
            })}>
            Attachments
          </h3>
          <div className={cn('grid gap-6 grid-cols-1', gridClass)}>
            {images.productImages?.map((image, index) => (
              <ImageItem key={index} title={image.name} date={image.created_at}>
                <UploadImage
                  src={image.src}
                  alt={image.alt}
                  key={image.key}
                  thumbnail={thumbnail}
                  deleteFile={deleteFile}
                  setThumbnail={setThumbnail}
                />
              </ImageItem>
            ))}
            {images.uploadedImages.map((image, index) => (
              <ImageItem key={index} title={image.name} date={image.created_at}>
                <UploadImage
                  src={image.src}
                  alt={image.alt}
                  key={image.key}
                  thumbnail={thumbnail}
                  deleteFile={deleteFile}
                  setThumbnail={setThumbnail}
                />
              </ImageItem>
            ))}
            {images.pendingImages.map((image, index) => (
              <ImageItem key={index} title={image.name}>
                <UploadImagePending />
              </ImageItem>
            ))}
          </div>
        </div>

        <div
          {...getRootProps()}
          className={cn(uploaderClassName, {
            'pointer-events-none opacity-50': disabled
          })}>
          <input {...getInputProps()} disabled={disabled} />
          Click to add / drop your files here
          <span className="text-sm">
            Images up to {routeConfig?.image?.maxFileSize}, max {maxFileCount}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { forwardRef, useCallback } from 'react'
import { useDropzone } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import Image from 'next/image'
import { UploadIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import usePreviewImages from '@/hooks/usePreviewImages'

interface MultiUploaderProps {
  permittedFileInfo: any
  error: string
  files: File[]
  addFiles: (files: File[]) => void
}

export const MultiUploader = forwardRef<HTMLButtonElement, MultiUploaderProps>(
  ({ permittedFileInfo, error, files, addFiles }, ref) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      addFiles(acceptedFiles)
    }, [])
    const { previewFiles } = usePreviewImages({ files })

    const fileTypes = permittedFileInfo?.config
      ? Object.keys(permittedFileInfo?.config)
      : []

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined
    })

    return (
      <div className="grid gap-2">
        <Image
          alt="Product image"
          className="aspect-square w-full rounded-md object-cover"
          height="300"
          src={(previewFiles[0] as string) || '/placeholder.svg'}
          width="300"
        />
        <div className="grid grid-cols-3 gap-2">
          <button type="button">
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="84"
              src={(previewFiles[1] as string) || '/placeholder.svg'}
              width="84"
            />
          </button>
          <button type="button">
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="84"
              src={(previewFiles[2] as string) || '/placeholder.svg'}
              width="84"
            />
          </button>
          <button
            ref={ref}
            type="button"
            className={cn(
              'flex aspect-square w-full rounded-md border border-dashed',
              {
                'focus:border-red-500': error.length
              }
            )}>
            <div
              className="flex items-center justify-center flex-1 self-stretch"
              {...getRootProps()}>
              <input
                {...getInputProps()}
                className={cn('w-full self-stretch h-full block')}
              />
              <UploadIcon className="absolute" />
              <span className="sr-only">Upload</span>
            </div>
          </button>
        </div>
        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
      </div>
    )
  }
)

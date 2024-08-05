import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { UploadDropzone } from '@/lib/uploadthing'
import { useToast } from '@/components/ui/use-toast'
import type { ImageSelect } from '@/db/schema'

interface UploaderProps {
  addFiles: (files: { key: string; url: string }[]) => void
  myFiles: Partial<ImageSelect>[]
  uploadedFiles?: ImageSelect[]
}

export default function Uploader({
  addFiles,
  myFiles,
  uploadedFiles
}: UploaderProps) {
  const { toast } = useToast()

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Manage all images</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[850px] max-h-[600px]">
          <DialogHeader>
            <DialogTitle>Manage product images</DialogTitle>
            <DialogDescription>
              Manage product images. The first image will used as thumbnail.
            </DialogDescription>
          </DialogHeader>
          <div className="flex max-h-[250px] overflow-y-auto gap-4">
            {!!uploadedFiles?.length &&
              uploadedFiles.map(({ key, url }) => (
                <Image
                  key={key}
                  src={url!}
                  alt="Product Image"
                  width={180}
                  height={180}
                  className="rounded-md object-cover"
                />
              ))}
            {!!myFiles.length &&
              myFiles.map(({ key, url }) => (
                <Image
                  key={key}
                  src={url!}
                  alt="Product Image"
                  width={180}
                  height={180}
                  className="rounded-md object-cover"
                />
              ))}
          </div>
          <UploadDropzone
            appearance={{
              button: ({ isUploading }) => {
                return cn(
                  'bg-primary text-primary-foreground font-medium focus:ring-primary',
                  {
                    'bg-muted-foreground after:bg-primary': isUploading
                  }
                )
              },
              label: 'text-primary hover:text-muted-foreground',
              allowedContent: 'text-muted-foreground',
              container: cn({
                'opacity-50 pointer-events-none':
                  myFiles.length + (uploadedFiles?.length || 0) >= 5
              })
            }}
            endpoint="imageUploader"
            onClientUploadComplete={res => {
              const myFiles = res.map(({ key, url }) => ({ key, url }))
              addFiles(myFiles)
            }}
            onUploadError={(error: Error) => {
              toast({
                title: error.name,
                description: error.message,
                variant: 'destructive'
              })
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

import Image from 'next/image'
import { SpinnerStatus } from '@/components/ui/spinner'
import { ImageIcon, Trash } from 'lucide-react'

export const UploadImagePending = () => (
  <div className="relative bg-secondary group cursor-pointer w-full h-[220px] flex items-center justify-center">
    <SpinnerStatus />
  </div>
)

export const Thumbnail = ({
  thumbnail,
  src
}: {
  thumbnail: string
  src: string
}) => {
  return (
    <>
      {thumbnail === src && (
        <span className="z-20 py-1 px-2 text-xs text-white bg-primary rounded-full absolute top-2 right-2">
          Thumbnail
        </span>
      )}
    </>
  )
}

export const UploadImage = ({
  src,
  alt,
  key,
  thumbnail,
  deleteFile,
  setThumbnail
}: {
  src: string
  alt: string
  key: string
  thumbnail: string
  deleteFile: (key: string, src?: string) => void
  setThumbnail: (thumbnailSrc: string) => void
}) => {
  return (
    <div className="relative group bg-secondary h-[220px]">
      <Thumbnail thumbnail={thumbnail} src={src} />
      <Image
        src={src || '/placeholder.svg'}
        alt={alt}
        fill
        className="rounded-lg w-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/40 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity flex items-end justify-end p-2 gap-2">
        <button title="Delete this image">
          <Trash
            onClick={() => deleteFile(key, src)}
            strokeWidth={1.5}
            className="w-5 h-5 text-white"
          />
          <span className="sr-only">Delete this image</span>
        </button>
        <button
          title="Set this image as thumbnail"
          onClick={() => setThumbnail(src)}>
          <ImageIcon strokeWidth={1.5} className="w-5 h-5 text-white" />
          <span className="sr-only">Set this image as thumbnail</span>
        </button>
      </div>
    </div>
  )
}

export const ImageItem = ({
  title,
  date,
  children
}: {
  title: string
  date?: string
  children: React.ReactNode
}) => (
  <div>
    {children}
    <p className="text-sm mt-2 text-zinc-400 break-words">{title}</p>
    {date && <p className="text-xs text-zinc-500">{date}</p>}
  </div>
)

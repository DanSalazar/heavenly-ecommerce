import Image from 'next/image'
import { SpinnerStatus } from '@/components/ui/spinner'
import { ImageIcon, Trash } from 'lucide-react'

export const UploadImagePending = () => (
  <div className="relative bg-secondary group cursor-pointer w-full h-[220px] flex items-center justify-center">
    <SpinnerStatus />
  </div>
)

export const ImageUploaded = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative group bg-secondary h-[220px]">
    <Image
      src={src}
      alt={alt}
      fill
      className="rounded-lg w-full object-cover"
    />
    <div className="absolute inset-0 bg-primary/40 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity flex items-end justify-end p-2 gap-2">
      <button>
        <Trash strokeWidth={1.5} className="w-5 h-5 text-white" />
      </button>
      <button>
        <ImageIcon strokeWidth={1.5} className="w-5 h-5 text-white" />
      </button>
    </div>
  </div>
)

export const ImageItem = ({
  title,
  src,
  alt,
  date
}: {
  title: string
  src: string
  alt: string
  date?: string
}) => (
  <div>
    {src ? <ImageUploaded src={src} alt={alt} /> : <UploadImagePending />}
    <p className="text-sm mt-2 text-zinc-400 break-words">{title}</p>
    {date && <p className="text-xs text-zinc-500">{date}</p>}
  </div>
)

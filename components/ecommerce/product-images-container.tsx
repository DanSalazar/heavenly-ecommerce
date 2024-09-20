'use client'

import useLightbox from '@/hooks/useLightbox'
import Image from 'next/image'
import NextJsImage from '../gallery/next-js-image'
import { ImageSelect } from '@/db/schema'

export default function ProductImagesContainer({
  thumbnail,
  images
}: {
  thumbnail: string
  images: ImageSelect[]
}) {
  const { openLightbox, renderLightbox } = useLightbox()

  const slides = images.map(({ src }) => ({ src }))

  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="col-span-2" onClick={() => openLightbox(0)}>
        <Image width={800} height={800} src={thumbnail} alt={'Product Image'} />
      </button>
      {images[1] && (
        <button onClick={() => openLightbox(1)}>
          <Image
            className="hidden md:block"
            width={400}
            height={500}
            src={images[1].src}
            alt={'Product Image'}
          />
        </button>
      )}
      {images[2] && (
        <button onClick={() => openLightbox(2)}>
          <Image
            className="hidden md:block"
            width={400}
            height={500}
            src={images[2].src}
            alt={'Product Image'}
          />
        </button>
      )}
      {renderLightbox({ slides, render: { slide: NextJsImage } })}
    </div>
  )
}

'use client'

import useLightbox from '@/hooks/useLightbox'
import Image from 'next/image'
import NextJsImage from '../gallery/next-js-image'

export default function ProductImagesContainer({
  image,
  alt
}: {
  image: string
  alt: string
}) {
  const { openLightbox, renderLightbox } = useLightbox()

  const slides = [{ src: image }, { src: image }, { src: image }]

  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="col-span-2" onClick={openLightbox}>
        <Image width={800} height={800} src={image} alt={alt} />
      </button>
      <Image
        className="hidden md:block"
        width={400}
        height={500}
        src={image}
        alt={alt}
      />
      <Image
        className="hidden md:block"
        width={400}
        height={500}
        src={image}
        alt={alt}
      />
      {renderLightbox({ slides, render: { slide: NextJsImage } })}
    </div>
  )
}

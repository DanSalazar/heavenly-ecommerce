import Image from 'next/image'
import {
  RenderSlideProps,
  SlideImage,
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState
} from 'yet-another-react-lightbox'

function isNextJsImage(slide: SlideImage) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === 'number' &&
    typeof slide.height === 'number'
  )
}

export default function NextJsImage({
  slide,
  offset,
  rect
}: RenderSlideProps<SlideImage>) {
  const {
    on: { click },
    carousel: { imageFit }
  } = useLightboxProps()

  const { currentIndex } = useLightboxState()

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)

  if (!isNextJsImage(slide)) return undefined
  const width = !cover
    ? Math.round(
        //@ts-ignore
        Math.min(rect.width, (rect.height / slide.height || 0) * slide.width)
      )
    : rect.width

  const height = !cover
    ? Math.round(
        //@ts-ignore
        Math.min(rect.height, (rect.width / slide.width) * slide.height)
      )
    : rect.height

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        fill
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        style={{
          objectFit: cover ? 'cover' : 'contain',
          cursor: click ? 'pointer' : undefined
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  )
}

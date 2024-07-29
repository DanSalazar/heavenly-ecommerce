import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import type { LightboxExternalProps } from 'yet-another-react-lightbox'

const Lightbox = dynamic(() => import('@/components/gallery/lightbox'))

export default function useLightbox() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [interactive, setInteractive] = useState(false)

  const openLightbox = useCallback((idx: number) => {
    setOpen(true)
    setInteractive(true)
    setIndex(idx)
  }, [])

  const renderLightbox = useCallback(
    (props?: Omit<LightboxExternalProps, 'open' | 'close'>) =>
      interactive ? (
        <Lightbox
          open={open}
          index={index}
          close={() => setOpen(false)}
          {...props}
        />
      ) : null,
    [open, interactive]
  )

  return { openLightbox, renderLightbox }
}

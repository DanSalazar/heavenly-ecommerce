import { useEffect, useState } from 'react'

export default function usePreviewImages({
  files
}: {
  files: (File | string)[]
}) {
  const [filesAsUrl, setFilesAsUrl] = useState<string[]>([])

  useEffect(() => {
    const readResult = (file: File) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        if (reader.result) {
          const result = reader.result

          if (typeof result === 'string') setFilesAsUrl([...filesAsUrl, result])
        }
      })

      reader.readAsDataURL(file)
    }

    if (files.length) {
      files.forEach(file => {
        if (typeof file === 'string') {
          setFilesAsUrl([...filesAsUrl, file])
          return
        }

        readResult(file)
      })
    }
  }, [files])

  return { previewFiles: filesAsUrl }
}

import { useEffect, useState } from 'react'

export default function usePreviewImages({ files }: { files: File[] }) {
  const [filesAsUrl, setFilesAsUrl] = useState<(string | ArrayBuffer)[]>([])

  useEffect(() => {
    const readResult = (file: File) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        if (reader.result) {
          const result = reader.result
          setFilesAsUrl([...filesAsUrl, result])
        }
      })

      reader.readAsDataURL(file)
    }

    if (files.length) {
      files.forEach(readResult)
    }
  }, [files])

  return { previewFiles: filesAsUrl }
}

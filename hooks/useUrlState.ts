'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function useUrlState(key: string) {
  const params = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const push = (key: string, value: string) => {
    const newParams = new URLSearchParams(params)
    const keyLower = key.toLowerCase()
    const valueLower = value.toLowerCase()

    if (key) {
      if (newParams.get(key) === value) newParams.delete(keyLower)
      else newParams.set(keyLower, valueLower)
    } else newParams.delete(value.toLowerCase())

    replace(pathname + '?' + newParams.toString())
  }

  const getState = () => params.get(key)

  return { getState, push }
}

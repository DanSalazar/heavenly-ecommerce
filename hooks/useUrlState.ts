import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function useUrlState() {
  const params = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const remove = (key: string, value?: string) => {
    const newParams = new URLSearchParams(params)

    const valueInParams = newParams.get(key)

    if (!value && valueInParams) {
      newParams.delete(key)
    }

    if (value && valueInParams) {
      const stringWithouthValue =
        valueInParams
          .split(',')
          .filter(val => val !== value)
          .join(',') || ''

      if (stringWithouthValue === '') newParams.delete(key)
      else newParams.set(key, stringWithouthValue)
    }

    replace(pathname + '?' + newParams.toString(), { scroll: false })
  }

  const push = (key: string, value: string) => {
    const newParams = new URLSearchParams(params)
    const keyLower = key.toLowerCase()
    const valueLower = value.toLowerCase()

    const valueInParams = newParams.get(keyLower)

    if (valueInParams) {
      if (valueInParams.includes(valueLower)) {
        remove(keyLower, value)
        return
      } else {
        newParams.set(keyLower, valueInParams + ',' + valueLower)
      }
    } else newParams.set(keyLower, valueLower)

    replace(pathname + '?' + newParams.toString(), { scroll: false })
  }

  const add = (key: string, value: string) => {
    const newParams = new URLSearchParams(params)
    const keyLower = key.toLowerCase()
    const valueLower = value.toLowerCase()

    if (newParams.get(keyLower) === valueLower) {
      newParams.delete(keyLower)
    } else newParams.set(keyLower, valueLower)

    replace(pathname + '?' + newParams.toString(), { scroll: false })
  }

  const getState = (key: string) => params.get(key)

  return { params, getState, push, remove, add }
}

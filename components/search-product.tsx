'use client'

import { Input } from './ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'

export default function SearchProduct({
  extendOnSubmit,
  className,
  placeholder
}: {
  extendOnSubmit?: () => void
  className?: string
  placeholder?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const search = form.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('q', search.value)
    } else {
      newParams.delete('q')
      return
    }

    router.push('/search?' + newParams.toString())
    extendOnSubmit && extendOnSubmit()
  }

  return (
    <form onSubmit={onSubmit} className={cn('relative', className)}>
      <SearchIcon
        strokeWidth={1.5}
        className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
      />
      <Input
        name="search"
        placeholder={placeholder || 'Search for products...'}
        type="search"
        defaultValue={searchParams?.get('q') || ''}
        autoComplete="off"
        className="w-full rounded-lg pl-8"
      />
    </form>
  )
}

'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchInput({
  placeholder = 'Search for products name...'
}: {
  placeholder?: string
}) {
  const { replace } = useRouter()
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
    }

    replace(`?${newParams.toString()}`)
  }

  return (
    <form onSubmit={onSubmit} className={'relative flex-1'}>
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
        className="rounded-lg pl-8"
      />
    </form>
  )
}

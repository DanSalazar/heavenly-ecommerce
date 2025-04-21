'use client'

import { Input } from './ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SearchProduct({
  extendOnSubmit,
  className,
  placeholder
}: {
  extendOnSubmit?: () => void
  className?: string
  placeholder?: string
}) {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const search = form.search as HTMLInputElement
    const newParams = new URLSearchParams()

    if (search.value) {
      newParams.set('q', search.value)
    } else {
      newParams.delete('q')
    }

    router.push('/search?' + newParams.toString())
    extendOnSubmit && extendOnSubmit()
  }

  return (
    <form onSubmit={onSubmit} className={cn('relative', className)}>
      <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        name="search"
        placeholder={placeholder || t('navigation.search')}
        type="search"
        defaultValue={searchParams?.get('q') || ''}
        autoComplete="off"
        className="w-full pl-8 justify-center border-primary/20 rounded-full"
      />
    </form>
  )
}

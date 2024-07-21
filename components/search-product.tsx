'use client'

import { Input } from './ui/input'
import { SearchIcon } from './icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export default function SearchProduct() {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const search = form.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('search', search.value)
    } else {
      newParams.delete('search')
    }

    router.push('/search?' + newParams.toString())
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className={cn(
          'relative pointer-events-none opacity-0 duration-300 transition-opacity w-[280px]',
          {
            'opacity-100 pointer-events-auto': show
          }
        )}>
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          name="search"
          placeholder="Search for products..."
          type="search"
          disabled={!show}
          defaultValue={searchParams?.get('q') || ''}
          autoComplete="off"
          className="w-full rounded-lg pl-8"
        />
      </form>
      <Button size={'icon'} variant={'link'} onClick={() => setShow(!show)}>
        <SearchIcon />
      </Button>
    </>
  )
}

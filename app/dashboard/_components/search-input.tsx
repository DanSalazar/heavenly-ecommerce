'use client'

import { SearchIcon } from '@/components/icons'
import { Input } from '@/components/ui/input'
import useUrlState from '@/hooks/useUrlState'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchInput({
  placeholder = 'Search...',
  searchKey = 'search'
}: {
  placeholder?: string
  searchKey?: string
}) {
  const { add } = useUrlState()
  const handleChange = useDebouncedCallback((val: string) => {
    add(searchKey, val)
  }, 300)

  return (
    <div className="relative flex-1">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={val => handleChange(val.target.value)}
        type="search"
        placeholder={placeholder}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  )
}

'use client'

import { SearchIcon } from '@/components/icons'
import { Input } from '@/components/ui/input'
import useUrlState from '@/hooks/useUrlState'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchCustomer() {
  const { add } = useUrlState()
  const handleChange = useDebouncedCallback((val: string) => {
    add('search', val)
  }, 300)

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={val => handleChange(val.target.value)}
        type="search"
        placeholder="Search customer name..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  )
}

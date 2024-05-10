'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { MarkIcon } from '../icons'
import SortBy from './sort-by'
import { Filter, FilterChildren } from '.'
import { Input } from '../ui/input'

export default function FilterProducts() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  return (
    <div className="h-10 relative flex gap-2">
      <Button className="uppercase" onClick={handleOpen}>
        Filters
      </Button>
      <div className="my-1 border-r border-zinc-300" />
      <div className="hidden md:flex gap-2 w-[80%] overflow-hidden">
        <Button variant={'custom'}>
          Sneakers <MarkIcon className="ml-1" />
        </Button>
        <Button variant={'custom'}>
          Size M <MarkIcon className="ml-1" />
        </Button>
      </div>
      <SortBy />
      <Filter
        onClose={handleOpen}
        className="absolute top-12 left-0 w-full md:w-[300px]"
        open={open}>
        <FilterChildren title="Sizes">
          <Input placeholder="Size" />
        </FilterChildren>
      </Filter>
    </div>
  )
}

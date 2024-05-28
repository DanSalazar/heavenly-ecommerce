'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { MarkIcon } from '../icons'
import SortBy from './sort-by'
import { Filter, FilterChildren } from '.'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { AllFiltersType } from '@/db/schema'
import useUrlState from '@/hooks/useUrlState'

const FilterSelect = ({
  title,
  children,
  handleChange
}: {
  title: string
  children: React.ReactNode
  handleChange: (title: string, value: string) => void
}) => (
  <FilterChildren title={title}>
    <Select onValueChange={value => handleChange(title, value)}>
      <SelectTrigger>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  </FilterChildren>
)

export default function FilterProducts({
  filters
}: {
  filters: AllFiltersType
}) {
  const { categories, colors, sizes } = filters
  const [open, setOpen] = useState(false)
  const { params, push, remove } = useUrlState()

  const handleOpen = () => setOpen(!open)

  return (
    <div className="h-10 relative flex gap-2">
      <Button className="uppercase" onClick={handleOpen}>
        Filters
      </Button>
      <div className="my-1 border-r border-zinc-300" />
      <div className="hidden md:flex gap-2 w-[80%] overflow-hidden">
        {[...params.entries()].map(([key, filter], i) => (
          <Button
            onClick={() => remove(key)}
            key={filter + i}
            className="capitalize"
            variant={'custom'}>
            {filter} <MarkIcon className="ml-1" />
          </Button>
        ))}
      </div>
      <SortBy />
      <Filter
        onClose={handleOpen}
        className="absolute top-12 left-0 w-full md:w-[300px]"
        open={open}>
        <FilterSelect title="Category" handleChange={push}>
          {categories.map((ctg, i) => (
            <SelectItem key={ctg.id} value={ctg.name!}>
              <span className="capitalize">{ctg.name}</span>
            </SelectItem>
          ))}
        </FilterSelect>
        <FilterSelect title="Color" handleChange={push}>
          {colors.map((color, i) => (
            <SelectItem key={color.id} value={color.name!}>
              <span className="capitalize">{color.name}</span>
            </SelectItem>
          ))}
        </FilterSelect>
        <FilterSelect title="Size" handleChange={push}>
          {sizes.map((size, i) => (
            <SelectItem key={size.id} value={size.name!}>
              <span className="capitalize">{size.name}</span>
            </SelectItem>
          ))}
        </FilterSelect>
      </Filter>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { MarkIcon } from '../icons'
import SortBy from './sort-by'
import { Filter, FilterChildren } from '.'
import { Input } from '../ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

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

export default function FilterProducts() {
  const [open, setOpen] = useState(false)
  const params = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleOpen = () => setOpen(!open)

  const handleChange = (title: string, value: string) => {
    const newParams = new URLSearchParams(params)

    if (value) newParams.set(title.toLowerCase(), value.toLowerCase())
    else newParams.delete(title.toLowerCase())

    replace(pathname + '?' + newParams.toString())
  }

  return (
    <div className="h-10 relative flex gap-2">
      <Button className="uppercase" onClick={handleOpen}>
        Filters
      </Button>
      <div className="my-1 border-r border-zinc-300" />
      <div className="hidden md:flex gap-2 w-[80%] overflow-hidden">
        {[...params.values()].map((filter, i) => (
          <Button key={filter + i} className="capitalize" variant={'custom'}>
            {filter} <MarkIcon className="ml-1" />
          </Button>
        ))}
      </div>
      <SortBy />
      <Filter
        onClose={handleOpen}
        className="absolute top-12 left-0 w-full md:w-[300px]"
        open={open}>
        <FilterSelect title="Sizes" handleChange={handleChange}>
          {['XS', 'S', 'M', 'L'].map((item, i) => (
            <SelectItem key={item + i} value={item}>{item}</SelectItem>
          ))}
        </FilterSelect>
        <FilterSelect title="Category" handleChange={handleChange}>
          {['Shoes', 'Sneakers', 'Shirts', 'Jeans'].map((item, i) => (
            <SelectItem key={item + i} value={item}>{item}</SelectItem>
          ))}
        </FilterSelect>
      </Filter>
    </div>
  )
}

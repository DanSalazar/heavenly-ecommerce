'use client'

import { MouseEvent, useState } from 'react'
import { Button } from '../ui/button'
import { MarkIcon } from '../icons'
import SortBy from './sort-by'
import { Filter, FilterChildren } from '.'
import { AllFiltersType } from '@/db/schema'
import useUrlState from '@/hooks/useUrlState'

export default function Filters({ filters }: { filters: AllFiltersType }) {
  const { categories, colors, sizes } = filters
  const [open, setOpen] = useState(false)
  const { getState, params, push, remove } = useUrlState()

  const handleOpen = () => setOpen(!open)

  const handleSelectFilter = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLButtonElement

    if (element.tagName !== 'BUTTON') return
    const { key, value } = element.dataset
    if (key && value) push(key, value)
  }

  const handleRemoveFilter = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLButtonElement

    if (element.tagName !== 'BUTTON') return
    const { key, value } = element.dataset
    if (key && value) remove(key, value)
  }

  const paramEntries = [...params.entries()].filter(entry => entry[0] !== 'q')

  return (
    <div className="relative flex justify-between">
      <div className="flex gap-2 flex-1">
        <Button className="uppercase" onClick={handleOpen}>
          Filters
        </Button>

        {!!paramEntries.length && <div className="border-r border-zinc-200" />}

        <div
          onClick={handleRemoveFilter}
          className="hidden md:flex flex-wrap gap-2">
          {paramEntries.map(([key, filter]) => {
            if (key === 'search') return null

            return filter.split(',').map((value, j) => (
              <Button
                key={value + j}
                data-key={key}
                data-value={value}
                className="uppercase"
                variant={'outline'}>
                {value} <MarkIcon className="ml-1 pointer-events-none" />
              </Button>
            ))
          })}
        </div>
      </div>

      <SortBy />

      <Filter
        onClose={handleOpen}
        className="absolute top-12 left-0 w-full md:w-[300px]"
        open={open}
        onClick={handleSelectFilter}>
        <FilterChildren title="Category">
          <div className="flex gap-2 flex-wrap">
            {categories.map(ctg => (
              <Button
                key={ctg.id}
                data-key="category"
                data-value={ctg.name}
                className="rounded-full"
                variant={
                  getState('category')?.includes(ctg.name + '')
                    ? 'default'
                    : 'outline'
                }>
                {ctg.name}
              </Button>
            ))}
          </div>
        </FilterChildren>

        <FilterChildren title="Colors">
          <div className="flex gap-2 flex-wrap">
            {colors.map(color => (
              <Button
                key={color.id}
                data-key="color"
                data-value={color.name}
                className="rounded-full"
                variant={
                  getState('color')?.includes(color.name + '')
                    ? 'default'
                    : 'outline'
                }>
                {color.name}
              </Button>
            ))}
          </div>
        </FilterChildren>

        <FilterChildren title="Sizes">
          <div className="flex gap-2 flex-wrap">
            {sizes.map(size => (
              <Button
                size={'sm'}
                key={size.id}
                data-key="size"
                data-value={size.name}
                className="rounded-full uppercase"
                variant={
                  getState('size')?.includes(size.name + '')
                    ? 'default'
                    : 'outline'
                }>
                {size.name}
              </Button>
            ))}
          </div>
        </FilterChildren>
      </Filter>
    </div>
  )
}

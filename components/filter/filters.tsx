'use client'

import React, { MouseEvent, useState } from 'react'
import { Button } from '../ui/button'
import SortBy from './sort-by'
import { Filter, FilterChildren } from '.'
import useUrlState from '@/hooks/useUrlState'
import { PriceRange } from './price-slider'
import FiltersSelected from './filters-selected'

export type AllFiltersType = {
  categories: string[]
  colors: string[]
  sizes: string[]
  productTypes?: string[]
  minAndMaxPrice: { min: number; max: number }
}

export default function Filters({ filters }: { filters: AllFiltersType }) {
  const { categories, colors, sizes, minAndMaxPrice } = filters
  const [open, setOpen] = useState(false)
  const { getState, push } = useUrlState()

  const handleOpen = () => setOpen(!open)

  const handleSelectFilter = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLButtonElement

    if (element.tagName !== 'BUTTON') return
    const { key, value } = element.dataset
    if (key && value) push(key, value)
  }

  return (
    <div className="relative flex justify-between">
      <div className="flex gap-2 flex-1">
        <Button className="uppercase" onClick={handleOpen}>
          Filters
        </Button>
        <FiltersSelected />
      </div>

      <SortBy />

      <Filter
        onClose={handleOpen}
        className="absolute top-12 left-0 w-full md:w-[300px]"
        open={open}
        onClick={handleSelectFilter}>
        <FilterChildren title="Price Range">
          <PriceRange min={minAndMaxPrice.min} max={minAndMaxPrice.max} />
        </FilterChildren>

        <FilterChildren title="Category">
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={crypto.randomUUID()}
                data-key="category"
                data-value={category}
                className="rounded-lg border-primary"
                variant={
                  getState('category')?.includes(category + '')
                    ? 'default'
                    : 'outline'
                }>
                {category}
              </Button>
            ))}
          </div>
        </FilterChildren>

        <FilterChildren title="Colors">
          <div className="flex gap-2 flex-wrap">
            {colors.map(color => (
              <Button
                key={crypto.randomUUID()}
                data-key="color"
                data-value={color}
                className="rounded-lg border-primary"
                variant={
                  getState('color')?.includes(color + '')
                    ? 'default'
                    : 'outline'
                }>
                {color}
              </Button>
            ))}
          </div>
        </FilterChildren>

        <FilterChildren title="Sizes">
          <div className="flex gap-2 flex-wrap">
            {sizes.map(size => (
              <Button
                size={'sm'}
                key={crypto.randomUUID()}
                data-key="size"
                data-value={size}
                className="rounded-lg border-primary uppercase"
                variant={
                  getState('size')?.includes(size + '') ? 'default' : 'outline'
                }>
                {size}
              </Button>
            ))}
          </div>
        </FilterChildren>
      </Filter>
    </div>
  )
}

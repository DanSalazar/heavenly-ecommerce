'use client'

import { MouseEvent } from 'react'
import { Button } from '../ui/button'
import SortBy from './sort-by'
import { FilterChildren } from '.'
import useUrlState from '@/hooks/useUrlState'
import FiltersSelected from './filters-selected'
import { PriceRange } from './price-slider'
import { usePathname, useRouter } from 'next/navigation'
import FilterPopover from './filter-popover'

export type AllFiltersType = {
  categories: string[]
  colors: string[]
  sizes: string[]
  minAndMaxPrice: number[]
} | null

export default function Filters({ filters }: { filters: AllFiltersType }) {
  const { getState, push } = useUrlState()

  const handleSelectFilter = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLButtonElement

    if (element.tagName !== 'BUTTON') return
    const { key, value } = element.dataset
    if (key && value) push(key, value)
  }

  if (!filters)
    return (
      <div className="relative flex justify-between flex-wrap">
        <div className="flex gap-2 flex-1">
          <FilterPopover>
            <div className="flex flex-col text-center py-4">
              <h2 className="text-xl font-medium">
                No items to show with these filters
              </h2>
              <p>Adjust filters or try looking for other products</p>
            </div>
            <div className="flex justify-end">
              <ResetAll />
            </div>
          </FilterPopover>
          <FiltersSelected />
        </div>
        <SortBy />
      </div>
    )

  const { categories, colors, sizes, minAndMaxPrice } = filters

  return (
    <div className="relative flex justify-between flex-wrap">
      <div className="flex gap-2 flex-1">
        <FilterPopover>
          {minAndMaxPrice[0] !== 0 && minAndMaxPrice[1] !== 0 && (
            <FilterChildren title="Price Range">
              <PriceRange
                key={minAndMaxPrice.join('-')}
                minAndMaxPrice={minAndMaxPrice}
              />
            </FilterChildren>
          )}

          {categories.length > 0 && (
            <FilterChildren onClick={handleSelectFilter} title="Category">
              <div className="flex gap-2 flex-wrap">
                {categories.map((category, idx) => (
                  <Button
                    key={category + idx}
                    data-key="category"
                    data-value={category}
                    className="rounded-lg capitalize border-primary"
                    variant={
                      getState('category')?.includes(category)
                        ? 'default'
                        : 'outline'
                    }>
                    {category}
                  </Button>
                ))}
              </div>
            </FilterChildren>
          )}

          {colors.length > 0 && (
            <FilterChildren onClick={handleSelectFilter} title="Colors">
              <div className="flex gap-2 flex-wrap">
                {colors.map((color, idx) => (
                  <Button
                    key={color + idx}
                    data-key="color"
                    data-value={color}
                    className="rounded-lg capitalize border-primary"
                    variant={
                      getState('color')?.includes(color) ? 'default' : 'outline'
                    }>
                    {color}
                  </Button>
                ))}
              </div>
            </FilterChildren>
          )}

          {sizes.length > 0 && (
            <FilterChildren onClick={handleSelectFilter} title="Sizes">
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size, idx) => (
                  <Button
                    size={'sm'}
                    key={size + idx}
                    data-key="size"
                    data-value={size}
                    className="rounded-lg uppercase border-primary"
                    variant={
                      getState('size')?.split(',')?.includes(size)
                        ? 'default'
                        : 'outline'
                    }>
                    {size}
                  </Button>
                ))}
              </div>
            </FilterChildren>
          )}
          <div className="flex justify-end">
            <ResetAll />
          </div>
        </FilterPopover>

        <FiltersSelected />
      </div>

      <SortBy />
    </div>
  )
}

export const ResetAll = () => {
  const { replace } = useRouter()
  const pathname = usePathname()

  const resetAll = () => {
    if (pathname.includes('search')) {
      replace(pathname + '?q=', { scroll: false })
      return
    }

    replace(pathname, { scroll: false })
  }

  return <Button onClick={resetAll}>Reset all</Button>
}

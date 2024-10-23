import { MouseEvent } from 'react'
import useUrlState from '@/hooks/useUrlState'
import { Button } from '../ui/button'
import { NOT_LISTED_FILTERS } from '@/lib/constants'
import { usePathname, useRouter } from 'next/navigation'
import { X } from 'lucide-react'

export default function FiltersSelected() {
  const pathname = usePathname()
  const { replace } = useRouter()
  const { params, getState, remove } = useUrlState()

  const handleRemoveFilter = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLButtonElement

    if (element.tagName !== 'BUTTON') return

    const { key, value } = element.dataset
    if (key && value) remove(key, value)
  }

  const filtersSelected = [...params.entries()].filter(
    entry => !NOT_LISTED_FILTERS.includes(entry[0])
  )

  const removePrice = () => {
    const p = new URLSearchParams(params)

    p.delete('price_from')
    p.delete('price_to')

    replace(`${pathname}?${p.toString()}`, { scroll: false })
  }

  const priceFrom = getState('price_from')
  const priceTo = getState('price_to')

  return (
    <>
      {!!filtersSelected.length && (
        <div className="border-r border-secondary" />
      )}
      <div
        onClick={handleRemoveFilter}
        className="hidden md:flex flex-wrap gap-2">
        {filtersSelected.map(([key, filter]) => {
          return filter.split(',').map((value, j) => (
            <Button
              key={value + j}
              data-key={key}
              data-value={value}
              className="uppercase gap-2 border-primary"
              variant={'outline'}>
              {value}{' '}
              <X
                width={18}
                height={18}
                strokeWidth={1.5}
                className="pointer-events-none"
              />
            </Button>
          ))
        })}

        {(priceFrom || priceTo) && (
          <Button
            className="uppercase gap-2 border-primary"
            variant={'outline'}
            onClick={removePrice}>
            ${priceFrom || '0'} - ${priceTo || '...'}{' '}
            <X width={20} height={20} className="pointer-events-none" />
          </Button>
        )}
      </div>
    </>
  )
}

import { MouseEvent } from 'react'
import useUrlState from '@/hooks/useUrlState'
import { Button } from '../ui/button'
import { MarkIcon } from '../icons'

export default function FiltersSelected() {
  const { params, remove } = useUrlState()

  const handleRemoveFilter = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLButtonElement

    if (element.tagName !== 'BUTTON') return
    const { key, value } = element.dataset
    if (key && value) remove(key, value)
  }

  const filtersSelected = [...params.entries()].filter(
    entry => entry[0] !== 'q'
  )

  return (
    <>
      {!!filtersSelected.length && <div className="border-r border-zinc-200" />}
      <div
        onClick={handleRemoveFilter}
        className="hidden md:flex flex-wrap gap-2">
        {filtersSelected.map(([key, filter]) => {
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
    </>
  )
}

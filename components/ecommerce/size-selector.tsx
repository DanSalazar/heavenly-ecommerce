import useUrlState from '@/hooks/useUrlState'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { capitalizeWord } from '@/lib/utils'
import SizeGuide from './size-guide'

export const NOT_AVAILABLE_BUTTON_CLASS =
  'relative z-10 cursor-not-allowed overflow-hidden bg-zinc-100 text-zinc-500 ring-1 ring-muted before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-primary/40'

export default function SizeSelector({
  sizes
}: {
  sizes: { name: string; isAvailable: boolean }[]
}) {
  const { add, getState } = useUrlState()

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-xl">Size</h2>
        <SizeGuide />
      </div>
      <div className="flex gap-2 flex-wrap">
        {sizes.map(size => {
          if (!size) return null
          return (
            <SizeButton
              key={size.name}
              name={size.name}
              optionName={'size'}
              isAvailable={size.isAvailable}
              add={add}
              isSelected={getState('size') === size.name}
            />
          )
        })}
      </div>
    </div>
  )
}

const SizeButton = ({
  optionName,
  name,
  add,
  isSelected,
  isAvailable
}: {
  optionName: string
  name: string
  add: (key: string, value: string) => void
  isSelected: boolean
  isAvailable: boolean
}) => {
  const optionCapitalized = capitalizeWord(name)

  return (
    <Button
      className={cn('border-primary/20 rounded-full uppercase', {
        [NOT_AVAILABLE_BUTTON_CLASS]: !isAvailable
      })}
      size={'sm'}
      aria-disabled={!isAvailable}
      disabled={!isAvailable}
      type="button"
      onClick={() => {
        add(optionName, name)
      }}
      variant={isSelected ? 'default' : 'outline'}
      title={`${capitalizeWord(optionName)} ${optionCapitalized} ${!isAvailable ? '(Out of Stock)' : ''}`}>
      {optionCapitalized}
    </Button>
  )
}

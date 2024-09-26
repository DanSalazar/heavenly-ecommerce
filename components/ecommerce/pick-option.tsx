import useUrlState from '@/hooks/useUrlState'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { capitalizeWord } from '@/utils'

export const NOT_AVAILABLE_BUTTON_CLASS =
  'relative z-10 cursor-not-allowed overflow-hidden bg-zinc-100 text-zinc-500 ring-1 ring-zinc-400 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-zinc-400 before:transition-transform'

export default function PickOption({
  optionName,
  options
}: {
  optionName: string
  options: { name: string; isAvailable: boolean }[]
}) {
  const { add, getState } = useUrlState()

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">{optionName}</h2>
      <div className="flex gap-2 flex-wrap">
        {options.map(option => {
          if (!option) return null
          return (
            <OptionButton
              key={option.name}
              name={option.name}
              optionName={optionName}
              isAvailable={option.isAvailable}
              add={add}
              isSelected={getState(optionName.toLowerCase()) === option.name}
            />
          )
        })}
      </div>
    </div>
  )
}

const OptionButton = ({
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
      className={cn({
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

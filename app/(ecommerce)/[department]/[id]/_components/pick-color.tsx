import { Button } from '@/components/ui/button'
import useUrlState from '@/hooks/useUrlState'
import { cn } from '@/lib/utils'

export default function PickColor({
  colors
}: {
  colors: { name: string; isAvailable: boolean }[]
}) {
  const { getState, add } = useUrlState()
  return (
    <div className="flex flex-col gap-2">
      <p className={'text-xl'}>Color</p>
      <div className="flex gap-2 flex-wrap">
        {colors.map(color => {
          if (!color) return null
          return (
            <ColorButton
              key={color.name}
              name={color.name}
              isAvailable={color.isAvailable}
              add={add}
              isSelected={getState('color') === color.name}
            />
          )
        })}
      </div>
    </div>
  )
}

const ColorButton = ({
  name,
  add,
  isSelected,
  isAvailable
}: {
  name: string
  add: (key: string, value: string) => void
  isSelected: boolean
  isAvailable: boolean
}) => {
  const notAvailableClass =
    'relative disabled:pointer-events-auto disabled:opacity-100 z-10 overflow-hidden cursor-not-allowed bg-zinc-100 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-500 ring-1 ring-zinc-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-zinc-300 before:transition'

  return (
    <Button
      className={cn('uppercase capitalize rounded-full', {
        [notAvailableClass]: !isAvailable
      })}
      size={'sm'}
      type="button"
      aria-disabled={!isAvailable}
      disabled={!isAvailable}
      onClick={() => {
        if (isAvailable) add('color', name)
      }}
      title={`Color ${name} ${!isAvailable ? '(Out of Stock)' : ''}`}
      variant={isSelected ? 'default' : 'outline'}>
      {name}
    </Button>
  )
}

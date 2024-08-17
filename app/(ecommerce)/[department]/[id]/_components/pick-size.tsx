import { Button } from '@/components/ui/button'
import useUrlState from '@/hooks/useUrlState'
import { cn } from '@/lib/utils'

export default function PickSize({
  sizes
}: {
  sizes: { name: string; isAvailable: boolean }[]
}) {
  const { getState, add } = useUrlState()

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl">Size</p>
      <div className="flex gap-2 flex-wrap">
        {sizes.map(size => {
          if (!size) return null
          return (
            <SizeButton
              key={size.name}
              name={size.name}
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
    'relative disabled:pointer-events-auto disabled:opacity-100 z-10 overflow-hidden cursor-not-allowed bg-zinc-100 hover:bg-zinc-100 text-zinc-500 ring-1 ring-zinc-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-zinc-600 before:transition'

  return (
    <Button
      className={cn('uppercase rounded-lg', {
        [notAvailableClass]: !isAvailable
      })}
      size={'sm'}
      aria-disabled={!isAvailable}
      disabled={!isAvailable}
      type="button"
      onClick={() => {
        add('size', name)
      }}
      variant={isSelected ? 'default' : 'outline'}
      title={`Size ${name.toUpperCase()} ${!isAvailable ? '(Out of Stock)' : ''}`}>
      {name}
    </Button>
  )
}

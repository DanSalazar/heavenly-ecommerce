import { Button } from '@/components/ui/button'
import useUrlState from '@/hooks/useUrlState'

export default function PickSize({ sizes }: { sizes: string[] }) {
  const { getState, add } = useUrlState()

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl">Size</p>
      <div className="flex gap-2 flex-wrap">
        {sizes.map(size => {
          if (!size) return null
          return (
            <SizeButton
              key={size}
              add={add}
              name={size}
              isSelected={getState('size') === size}
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
  isSelected
}: {
  name: string
  add: (key: string, value: string) => void
  isSelected: boolean
}) => {
  return (
    <Button
      className="uppercase rounded-full"
      size={'sm'}
      type="button"
      onClick={() => {
        add('size', name)
      }}
      variant={isSelected ? 'default' : 'outline'}
      title={name.toUpperCase() + ' size'}>
      {name}
    </Button>
  )
}

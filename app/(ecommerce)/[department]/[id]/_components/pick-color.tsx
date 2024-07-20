import { Button } from '@/components/ui/button'
import useUrlState from '@/hooks/useUrlState'

export default function PickColor({ colors }: { colors: string[] }) {
  const { getState, add } = useUrlState()
  return (
    <div className="flex flex-col gap-2">
      <p className={'text-xl'}>Color</p>
      <div className="flex gap-2 flex-wrap">
        {colors.map(color => {
          if (!color) return null
          return (
            <ColorButton
              key={color}
              name={color}
              add={add}
              isSelected={getState('color') === color}
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
  isSelected
}: {
  name: string
  isSelected: boolean
  add: (key: string, value: string) => void
}) => {
  return (
    <Button
      size={'sm'}
      className="rounded-full capitalize"
      type="button"
      onClick={() => {
        add('color', name)
      }}
      title={'Color ' + name}
      variant={isSelected ? 'default' : 'outline'}>
      {name}
    </Button>
  )
}

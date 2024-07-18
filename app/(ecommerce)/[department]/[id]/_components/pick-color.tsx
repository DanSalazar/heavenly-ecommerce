import { Button } from '@/components/ui/button'
import type { Color, ProductVariantWithJoins } from '@/db/schema'
import useUrlState from '@/hooks/useUrlState'

export default function PickColor({
  variants
}: {
  variants: ProductVariantWithJoins[]
}) {
  const { getState, add } = useUrlState()
  return (
    <div className="flex flex-col gap-2">
      <p className={'text-xl'}>Color</p>
      <div className="flex gap-2 flex-wrap">
        {variants.map(({ color }) => {
          if (!color) return null
          return (
            <ColorButton
              key={color.id}
              color={color}
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
  color,
  add,
  isSelected
}: {
  color: Color
  isSelected: boolean
  add: (key: string, value: string) => void
}) => {
  return (
    <Button
      size={'sm'}
      key={color.id}
      className="rounded-full capitalize"
      type="button"
      onClick={() => {
        add('color', color.name!)
      }}
      title={'Color ' + color.name}
      variant={isSelected ? 'default' : 'outline'}>
      {color.name}
    </Button>
  )
}

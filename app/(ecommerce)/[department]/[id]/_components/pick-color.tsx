import { Button } from '@/components/ui/button'
import type { Color, ProductVariantWithJoins } from '@/db/schema'
import useUrlState from '@/hooks/useUrlState'
import { cn } from '@/lib/utils'

export default function PickColor({
  data,
  error,
  cleanErrors
}: {
  data: ProductVariantWithJoins[]
  error: boolean
  cleanErrors: (key: 'color' | 'size') => void
}) {
  const { getState, add } = useUrlState()
  return (
    <div className="flex flex-col gap-2">
      <p className={cn('text-xl', { 'text-red-500': error })}>Color</p>
      <div className="flex gap-2 flex-wrap">
        {data.map(({ color }) => {
          if (!color) return null
          return (
            <ColorButton
              key={color.id}
              color={color}
              cleanErrors={cleanErrors}
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
  cleanErrors,
  add,
  isSelected
}: {
  color: Color
  cleanErrors: (key: 'color' | 'size') => void
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
        cleanErrors('color')
        add('color', color.name!)
      }}
      title={'Color ' + color.name}
      variant={isSelected ? 'default' : 'outline'}>
      {color.name}
    </Button>
  )
}

import { Button } from '@/components/ui/button'
import { ProductVariantWithJoins, Size } from '@/db/schema'
import useUrlState from '@/hooks/useUrlState'

export default function PickSize({
  variants
}: {
  variants: ProductVariantWithJoins[]
}) {
  const { getState, add } = useUrlState()

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl">Size</p>
      <div className="flex gap-2 flex-wrap">
        {variants.map(({ size }) => {
          if (!size) return null
          return (
            <SizeButton
              key={size.id}
              size={size}
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
  size,
  add,
  isSelected
}: {
  size: Size
  add: (key: string, value: string) => void
  isSelected: boolean
}) => {
  return (
    <Button
      className="uppercase rounded-full"
      size={'sm'}
      type="button"
      onClick={() => {
        add('size', size.name!)
      }}
      variant={isSelected ? 'default' : 'outline'}
      title={size.name + ' size'}>
      {size.name}
    </Button>
  )
}

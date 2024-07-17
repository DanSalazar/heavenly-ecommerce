import { Button } from '@/components/ui/button'
import { ProductVariantWithJoins, Size } from '@/db/schema'
import useUrlState from '@/hooks/useUrlState'
import { cn } from '@/lib/utils'

export default function PickSize({
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
      <p className={cn('text-xl', { 'text-red-500': error })}>Size</p>
      <div className="flex gap-2 flex-wrap">
        {data.map(({ size }) => {
          if (!size) return null
          return (
            <SizeButton
              key={size.id}
              size={size}
              cleanErrors={cleanErrors}
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
  cleanErrors,
  add,
  isSelected
}: {
  size: Size
  cleanErrors: (key: 'size') => void
  add: (key: string, value: string) => void
  isSelected: boolean
}) => {
  return (
    <Button
      className="uppercase rounded-full"
      size={'sm'}
      type="button"
      onClick={() => {
        cleanErrors('size')
        add('size', size.name!)
      }}
      variant={isSelected ? 'default' : 'outline'}
      title={size.name + ' size'}>
      {size.name}
    </Button>
  )
}

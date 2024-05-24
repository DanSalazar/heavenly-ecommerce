import { Button } from '@/components/ui/button'
import { ProductVariantWithJoins } from '@/db/schema'
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
  const { getState, push } = useUrlState('color')
  return (
    <div className="flex items-center gap-2">
      <p className={cn('font-medium', { 'text-red-500': error })}>Color:</p>
      {[...new Set(data.map(({ color }) => color?.name || ''))].map(
        (color, i) => {
          if (!color.length) return <></>
          return (
            <Button
              key={color + i}
              type="button"
              onClick={() => {
                cleanErrors('size')
                push('size', color)
              }}
              variant={getState() === color ? 'default' : 'outline'}>
              {color}
            </Button>
          )
        }
      )}
    </div>
  )
}

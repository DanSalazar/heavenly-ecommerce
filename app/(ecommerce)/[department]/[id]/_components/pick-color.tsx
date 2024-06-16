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
  const { getState, push } = useUrlState()
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className={cn('font-medium', { 'text-red-500': error })}>Color:</p>
      {[...new Set(data.map(({ color }) => color?.name || ''))].map(
        (color, i) => {
          if (!color.length) return <></>
          return (
            <Button
              key={color + i}
              type="button"
              onClick={() => {
                cleanErrors('color')
                push('color', color)
              }}
              variant={
                getState('color')?.includes(color) ? 'default' : 'outline'
              }>
              {color}
            </Button>
          )
        }
      )}
    </div>
  )
}

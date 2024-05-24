import { Button } from '@/components/ui/button'
import { ProductVariantWithJoins } from '@/db/schema'
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
  const { getState, push } = useUrlState('size')

  return (
    <div className="flex items-center gap-2">
      <p className={cn('font-medium', { 'text-red-500': error })}>Size:</p>
      {[...new Set(data.map(({ size }) => size?.name || ''))].map((size, i) => {
        if (!size.length) return <></>
        return (
          <Button
            key={size + i}
            type="button"
            onClick={() => {
              cleanErrors('size')
              push('size', size)
            }}
            variant={getState() === size ? 'default' : 'outline'}>
            {size}
          </Button>
        )
      })}
    </div>
  )
}

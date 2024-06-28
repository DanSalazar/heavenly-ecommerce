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
  const { getState, push } = useUrlState()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className={cn('font-medium', { 'text-red-500': error })}>Size:</p>
      {[...new Set(data.map(({ size }) => size?.name || ''))].map((size, i) => {
        if (!size.length) return <></>
        return (
          <Button
            className="rounded-full"
            key={size + i}
            type="button"
            onClick={() => {
              cleanErrors('size')
              push('size', size)
            }}
            variant={getState('size')?.includes(size) ? 'default' : 'outline'}>
            {size}
          </Button>
        )
      })}
    </div>
  )
}

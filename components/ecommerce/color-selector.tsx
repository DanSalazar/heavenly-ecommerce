import useUrlState from '@/hooks/useUrlState'
import { cn } from '@/lib/utils'
import { capitalizeWord } from '@/lib/utils'

export default function ColorSelector({
  colors
}: {
  colors: { name: string; isAvailable: boolean; hex_code: string }[]
}) {
  const { add, getState } = useUrlState()
  const color = getState('color')

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">
        Color{color ? ': ' + capitalizeWord(color) : ''}
      </h2>
      <div className="flex gap-4">
        {colors.map(({ name, hex_code, isAvailable }) => (
          <button
            key={name}
            onClick={() => add('color', name)}
            title={`Color ${name}`}
            className={cn(
              'w-6 h-6 rounded-full hover:ring-1 hover:ring-primary hover:ring-offset-4',
              {
                'ring-1 ring-primary ring-offset-4':
                  color?.toLowerCase() === name,
                'opacity-20 pointer-events-none': !isAvailable
              }
            )}
            style={{ backgroundColor: hex_code }}
            aria-label={`Select ${name} color`}
          />
        ))}
      </div>
    </div>
  )
}

import { CheckIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

export default function Step({
  step,
  steps
}: {
  step: number
  steps: string[]
}) {
  return (
    <div className="relative flex flex-wrap justify-between">
      {steps.map((stepName, i) => (
        <div className="z-10 flex flex-col gap-2">
          <div
            className={cn(
              'w-5 h-5 flex self-center items-center justify-center bg-zinc-50 border border-zinc-400 rounded-full',
              {
                'self-end': i === steps.length - 1,
                'self-start': i === 0,
                'bg-primary text-white': i === step || step > i
              }
            )}>
            {i === step && <CheckIcon width={14} height={14} />}
          </div>
          <p className="font-medium text-sm uppercase">{stepName}</p>
        </div>
      ))}
      <span className="absolute h-[1px] top-2 w-full bg-zinc-600"></span>
    </div>
  )
}

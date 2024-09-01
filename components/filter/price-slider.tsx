import { forwardRef, useState } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type PriceRangeProps = {
  minAndMaxPrice: number[]
}

export const PriceRange = ({ minAndMaxPrice }: PriceRangeProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [state, setState] = useState<number[]>(minAndMaxPrice)
  const [min, max] = minAndMaxPrice
  const steps = max - min <= 300 ? 1 : 3

  const handleRangeChange = (value: number[]) => {
    setState(value)
  }

  const handleRangeCommit = (value: number[]) => {
    const params = new URLSearchParams(searchParams)
    const [minValue, maxValue] = value

    if (minValue >= min) {
      params.set('price_from', minValue.toString())
    }

    if (maxValue <= max) {
      params.set('price_to', maxValue.toString())
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between font-medium">
        <p>${state[0]}</p>
        <p>${state[1]}</p>
      </div>
      <Slider
        minStepsBetweenThumbs={1}
        min={min}
        max={max}
        step={steps}
        value={state}
        onValueChange={handleRangeChange}
        onValueCommit={handleRangeCommit}
      />
    </div>
  )
}

type SliderProps = {
  className?: string
  min: number
  max: number
  minStepsBetweenThumbs: number
  step: number
  value: number[]
  onValueChange: (values: number[]) => void
  onValueCommit?: (values: number[]) => void
}

const Slider = forwardRef(
  (
    {
      className,
      min,
      max,
      step,
      value,
      onValueChange,
      onValueCommit,
      ...props
    }: SliderProps,
    ref
  ) => {
    const handleValueChange = (newValues: number[]) => {
      onValueChange(newValues)
    }

    // Adjust the value array if min and max are the same
    const adjustedValue = min === max ? [min, max + 1] : value

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={min === max ? max + 1 : max}
        step={step}
        value={adjustedValue}
        onValueChange={handleValueChange}
        onValueCommit={onValueCommit}
        className={cn(
          'relative flex w-full touch-none select-none mb-6 items-center',
          className
        )}
        {...props}>
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {adjustedValue.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="cursor-pointer block h-6 w-6 rounded-full bg-background transition ease-in-out border-2 border-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    )
  }
)

Slider.displayName = SliderPrimitive.Root.displayName

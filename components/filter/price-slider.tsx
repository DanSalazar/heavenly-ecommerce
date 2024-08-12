import React, { useState } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import useUrlState from '@/hooks/useUrlState'
import { cn } from '@/lib/utils'

type PriceRangeProps = {
  min: number
  max: number
}

export const PriceRange = ({ min, max }: PriceRangeProps) => {
  const { add, getState } = useUrlState()
  const [minState, setMinState] = useState(min)
  const [maxState, setMaxState] = useState(max)

  const value = getState('price')?.split('-').map(Number) || [min, max]

  const handleRangeChange = (value: readonly number[]) => {
    setMinState(value[0])
    setMaxState(value[1])

    add('price', value[0] + '-' + value[1])
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <p className={'text-sm font-medium'}>${minState}</p>
        <p className="text-sm font-medium">${maxState}</p>
      </div>
      <Slider
        minStepsBetweenThumbs={1}
        max={max}
        min={min}
        step={5}
        value={value}
        onValueChange={handleRangeChange}
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
  value?: number[] | readonly number[]
  onValueChange?: (values: number[]) => void
}

const Slider = React.forwardRef(
  (
    { className, min, max, step, value, onValueChange, ...props }: SliderProps,
    ref
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max]
    const [localValues, setLocalValues] = useState(initialValue)

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues)
      if (onValueChange) {
        onValueChange(newValues)
      }
    }

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        className={cn(
          'relative flex w-full touch-none select-none mb-6 items-center',
          className
        )}
        {...props}>
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary/60" />
        </SliderPrimitive.Track>
        {localValues.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="cursor-pointer block h-5 w-5 rounded-full border border-primary/50 bg-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    )
  }
)

Slider.displayName = SliderPrimitive.Root.displayName

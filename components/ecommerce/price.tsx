import { VariantProps, cva } from 'class-variance-authority'
import { cn, getDiscountPrice, priceFormatter } from '../../lib/utils'

const priceStyles = cva('flex gap 2', {
  variants: {
    variant: {
      default: 'text-zinc-600 dark:text-zinc-100',
      black: 'text-black dark:text-white'
    },
    size: {
      default: 'text-base',
      lg: 'text-xl',
      sm: 'text-sm'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type PriceProps = VariantProps<typeof priceStyles> & {
  price: number
  className?: string
}

export default function Price({ variant, size, price, className }: PriceProps) {
  return (
    <div
      className={cn(
        priceStyles({ variant, size }),
        'flex gap-x-2 flex-wrap',
        className
      )}>
      <p className={'text-zinc-600 font-medium'}>£{price}</p>
    </div>
  )
}

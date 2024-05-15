import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const priceStyles = cva('flex gap 2', {
  variants: {
    variant: {
      default: 'text-zinc-600 dark:text-zinc-100',
      black: 'text-primary font-medium'
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
    <p className={cn(priceStyles({ variant, size }), className)}>{price}$</p>
  )
}

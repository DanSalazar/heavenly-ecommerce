import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { formattedPrice, getDiscountPrice } from '@/utils'

const priceStyles = cva('', {
  variants: {
    variant: {
      default: 'text-zinc-600 dark:text-zinc-100',
      black: 'text-primary'
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
  discount?: boolean | null
  discount_percentage?: number | null
}

export default function Price({
  variant,
  size,
  price,
  className,
  discount = false,
  discount_percentage = 0
}: PriceProps) {
  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      <p
        className={cn(priceStyles({ variant, size }), {
          'line-through': discount
        })}>
        ${formattedPrice(price)}
      </p>
      <p
        className={cn(
          priceStyles({ size }),
          'hidden text-red-400 font-medium',
          {
            block: discount
          }
        )}>
        ${getDiscountPrice(price, discount_percentage!)}
      </p>
    </div>
  )
}

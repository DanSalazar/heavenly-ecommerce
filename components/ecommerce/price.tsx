import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { getDiscountPrice } from '@/utils'

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
    <div className="flex gap-2 flex-wrap">
      <p
        className={cn(priceStyles({ variant, size }), className, {
          'line-through': discount
        })}>
        {price}$ {discount}
      </p>
      <p
        className={cn('hidden text-rose-600 font-semibold', {
          block: discount
        })}>
        {getDiscountPrice(price, discount_percentage!)}$
        <span className={'text-sm font-normal ml-1'}>
          ({discount_percentage}%)
        </span>
      </p>
    </div>
  )
}

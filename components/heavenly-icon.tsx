import { cn } from '@/lib/utils'
import { marcellus } from './fonts'

export default function HeavenlyIcon({ className }: { className?: string }) {
  return (
    <p className={cn(marcellus.className + ' text-2xl uppercase', className)}>
      Heavenly
    </p>
  )
}

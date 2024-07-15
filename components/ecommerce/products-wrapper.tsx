import { cn } from '@/lib/utils'

export default function ProductsWrapper({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'grid lg:grid-cols-products gap-4 border-t py-4 border-zinc-200',
        props.className
      )}
      {...props}>
      {children}
    </div>
  )
}

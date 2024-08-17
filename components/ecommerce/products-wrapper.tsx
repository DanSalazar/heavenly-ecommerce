import { cn } from '@/lib/utils'

export default function ProductsWrapper({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div
        {...props}
        className={cn(
          'min-h-[400px] grid md:grid-cols-products gap-4 border-t py-4 border-zinc-200',
          props.className
        )}>
        {children}
      </div>
    </>
  )
}

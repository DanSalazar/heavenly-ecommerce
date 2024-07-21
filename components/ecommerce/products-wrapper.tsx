import { cn } from '@/lib/utils'
import { getFilters } from '@/server/actions'
import FilterProducts from '../filter/filter-products'

export default async function ProductsWrapper({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  const filters = await getFilters()

  return (
    <>
      <FilterProducts filters={filters} />
      <div
        className={cn(
          'grid lg:grid-cols-products gap-4 border-t py-4 border-zinc-200',
          props.className
        )}
        {...props}>
        {children}
      </div>
    </>
  )
}

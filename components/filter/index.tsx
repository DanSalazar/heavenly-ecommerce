import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Settings2Icon, XIcon } from 'lucide-react'

type FilterProps = ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode
  open: boolean
  onClose: () => void
  header?: React.ReactNode
}

type FilterChildrenProps = {
  title: string
  children: React.ReactNode
  handleChange: (title: string, value: string) => void
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const FilterTitle = ({ title }: Pick<FilterChildrenProps, 'title'>) => (
  <p className="font-semibold truncate capitalize">{title}</p>
)

const FilterChildren = ({
  title,
  onClick,
  children
}: Omit<FilterChildrenProps, 'handleChange'>) => (
  <div className="flex flex-col gap-2" onClick={onClick}>
    <header className="flex justify-between items-center">
      <FilterTitle title={title} />
    </header>
    {children}
  </div>
)

export const SelectFilter = ({
  title,
  children,
  handleChange
}: FilterChildrenProps) => (
  <FilterChildren title={title}>
    <Select onValueChange={value => handleChange(title, value)}>
      <SelectTrigger>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  </FilterChildren>
)

export const FilterFooter = ({ children }: { children: React.ReactNode }) => (
  <footer className="flex justify-end gap-2 p-3 border-t border-muted">
    {children}
  </footer>
)

export const FilterContent = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn('p-3', className)}>{children}</div>

function Filter({
  header = 'Filter by',
  className,
  children,
  onClose,
  open,
  ...props
}: FilterProps) {
  return (
    <div
      className={cn(
        'relative z-10 shadow-md bg-background rounded-md border border-primary/10 hidden',
        className,
        {
          'flex flex-col': open
        }
      )}
      {...props}>
      <header className="p-4 border-b border-muted flex items-center gap-2">
        <Settings2Icon className="w-5 h-5" strokeWidth={1.5} />
        <h2 className="font-medium">{header}</h2>
        <button onClick={onClose} className="absolute right-4">
          <XIcon className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </header>
      {children}
    </div>
  )
}

export { Filter, FilterChildren }

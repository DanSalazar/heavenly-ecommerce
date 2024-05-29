import { ReactNode, ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { MarkIcon } from '../icons'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'

type FilterProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  open: boolean
  onClose: () => void
}

const FilterTitle = ({ title }: { title: string }) => (
  <p className="font-medium text-sm truncate capitalize">{title}</p>
)

const FilterChildren = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => (
  <div className="flex flex-col gap-2">
    <header className="flex justify-between items-center">
      <FilterTitle title={title} />
      <span className="text-black cursor-pointer text-sm hover:underline">
        Clear
      </span>
    </header>
    {children}
  </div>
)

export const SelectFilter = ({
  title,
  children,
  handleChange
}: {
  title: string
  children: React.ReactNode
  handleChange: (title: string, value: string) => void
}) => (
  <FilterChildren title={title}>
    <Select onValueChange={value => handleChange(title, value)}>
      <SelectTrigger>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  </FilterChildren>
)

function Filter({ className, children, onClose, open, ...props }: FilterProps) {
  return (
    <div
      className={cn(
        'z-10 transition-opacity pointer-events-none opacity-0 user-points shadow-md bg-background rounded-md border border-zinc-200 dark:border-zinc-800 flex flex-col',
        className,
        {
          'opacity-100 pointer-events-auto': open
        }
      )}>
      <header className="p-3 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="font-medium">Filter</h2>
        <button onClick={onClose}>
          <MarkIcon />
        </button>
      </header>
      <div className={cn('p-3 flex flex-col gap-4')}>{children}</div>
      <footer className="flex justify-end gap-2 p-3 border-t border-zinc-200 dark:border-zinc-800">
        <Button variant={'outline'}>Reset All</Button>
        <Button>Apply Now</Button>
      </footer>
    </div>
  )
}

export { Filter, FilterChildren }

import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { MarkIcon } from '../icons'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { usePathname, useRouter } from 'next/navigation'

type FilterProps = ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

type FilterChildrenProps = {
  title: string
  children: React.ReactNode
  handleChange: (title: string, value: string) => void
  onClear?: () => void
}

const FilterTitle = ({ title }: Pick<FilterChildrenProps, 'title'>) => (
  <p className="font-medium text-sm truncate capitalize">{title}</p>
)

const FilterChildren = ({
  title,
  children,
  onClear
}: Omit<FilterChildrenProps, 'handleChange'>) => (
  <div className="flex flex-col gap-2">
    <header className="flex justify-between items-center">
      <FilterTitle title={title} />
      <button
        onClick={onClear}
        className="text-black cursor-pointer text-sm hover:underline">
        Clear
      </button>
    </header>
    {children}
  </div>
)

export const SelectFilter = ({
  title,
  children,
  handleChange,
  onClear
}: FilterChildrenProps) => (
  <FilterChildren title={title} onClear={onClear}>
    <Select onValueChange={value => handleChange(title, value)}>
      <SelectTrigger>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  </FilterChildren>
)

function Filter({ className, children, onClose, open, ...props }: FilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'z-10 transition-opacity pointer-events-none opacity-0 user-points shadow-md bg-background rounded-md border border-zinc-200 dark:border-zinc-800 flex flex-col',
        className,
        {
          'opacity-100 pointer-events-auto': open
        }
      )}
      {...props}>
      <header className="p-3 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="font-medium">Filters</h2>
        <button onClick={onClose}>
          <MarkIcon />
        </button>
      </header>
      <div className={cn('p-3 flex flex-col gap-4')}>{children}</div>
      <footer className="flex justify-end gap-2 p-3 border-t border-zinc-200 dark:border-zinc-800">
        <Button
          onClick={() => {
            router.replace(pathname)
          }}>
          Reset All
        </Button>
      </footer>
    </div>
  )
}

export { Filter, FilterChildren }

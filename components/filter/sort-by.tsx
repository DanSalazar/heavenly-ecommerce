import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import useUrlState from '@/hooks/useUrlState'

export default function SortBy() {
  const { add, remove, getState } = useUrlState()

  return (
    <div className="ml-auto w-[200px] flex items-center gap-2 text-muted-foreground">
      <span className="text-sm ">Sort by:</span>
      <Select
        defaultValue="relevance"
        value={getState('order') || ''}
        onValueChange={value => {
          if (value === 'relevance') remove('order')
          else add('order', value)
        }}>
        <SelectTrigger className="border-none flex-1 px-0 outline-none text-primary font-medium">
          <SelectValue placeholder="Relevance"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="low to high">Price: Low to high</SelectItem>
          <SelectItem value="high to low">Price: High to low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

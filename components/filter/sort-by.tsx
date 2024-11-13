import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import useUrlState from '@/hooks/useUrlState'

export default function SortBy() {
  const { add, remove } = useUrlState()

  return (
    <Select
      defaultValue="relevance"
      onValueChange={value => {
        if (value === 'relevance') remove('order')
        else add('order', value)
      }}>
      <SelectTrigger className="w-[200px] font-medium">
        <SelectValue placeholder="Sort by"></SelectValue>
      </SelectTrigger>
      <SelectContent className="border-primary">
        <SelectItem value="relevance">Relevance</SelectItem>
        <SelectItem value="low to high">Price: Low to high</SelectItem>
        <SelectItem value="high to low">Price: High to low</SelectItem>
      </SelectContent>
    </Select>
  )
}

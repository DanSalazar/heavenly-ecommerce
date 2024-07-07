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
    <div className="absolute right-0 w-[150px]">
      <Select
        onValueChange={value => {
          if (value === 'none') remove('order')
          else add('order', value)
        }}>
        <SelectTrigger className="border-black font-medium">
          <SelectValue placeholder="Sort by"></SelectValue>
        </SelectTrigger>
        <SelectContent className="border-black">
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="low to high">Price low to high</SelectItem>
          <SelectItem value="high to low">Price high to low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

import { Filter, SelectFilter } from '@/components/filter'
import { SelectItem } from '@/components/ui/select'
import useUrlState from '@/hooks/useUrlState'

export default function FilterProducts({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const { push } = useUrlState()

  return (
    <Filter
      open={open}
      onClose={onClose}
      className="absolute right-0 top-12 w-full md:w-[350px]">
      <SelectFilter handleChange={push} title="Department">
        {['Men', 'Women'].map(department => (
          <SelectItem value={department} key={department}>
            {department}
          </SelectItem>
        ))}
      </SelectFilter>
    </Filter>
  )
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'

export function QuantitySelector({
  quantity,
  handleChange
}: {
  quantity: number
  handleChange: (value: number) => void
}) {
  return (
    <div className="flex gap-2 items-center">
      <p className="font-medium">Qty:</p>
      <Select onValueChange={value => handleChange(Number(value))}>
        <SelectTrigger className="rounded-none border-zinc-500 w-[70px]">
          <SelectValue placeholder={quantity} />
        </SelectTrigger>
        <SelectContent className="rounded-none border-zinc-500 max-h-[250px]">
          <SelectGroup>
            <SelectLabel>Quantity</SelectLabel>
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <SelectItem value={`${i + 1}`}>{i + 1}</SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

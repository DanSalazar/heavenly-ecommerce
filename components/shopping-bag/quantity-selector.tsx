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
  handleChange,
  max
}: {
  quantity: number
  handleChange: (value: number) => void
  max: number
}) {
  return (
    <div className="flex gap-2 items-center">
      <p className="font-medium">Quantity:</p>
      <Select onValueChange={value => handleChange(Number(value))}>
        <SelectTrigger className="w-[80px] border-primary" value={quantity}>
          <SelectValue placeholder={quantity} />
        </SelectTrigger>
        <SelectContent className="max-h-[250px] border-primary">
          <SelectGroup>
            <SelectLabel>Quantity</SelectLabel>
            {Array(max)
              .fill(null)
              .map((_, i) => (
                <SelectItem key={i} value={`${i + 1}`}>
                  {i + 1}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

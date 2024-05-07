import { MinusIcon, PlusIcon } from '../icons'
import { Button } from '../ui/button'

export function QuantitySelector() {
  return (
    <div className="flex gap-2 items-center">
      <p className="hidden md:block text-sm font-medium">Quantity:</p>
      <Button size={'sm'} variant={'ghost'}>
        <MinusIcon />
      </Button>
      <div className="border border-zinc-300 text-sm xs:text-base p-2 px-4 flex justify-center items-center">
        1
      </div>
      <Button size={'sm'} variant={'ghost'}>
        <PlusIcon />
      </Button>
    </div>
  )
}

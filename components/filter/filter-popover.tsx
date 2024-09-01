import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { Settings2Icon, XIcon } from 'lucide-react'

export default function FilterPopover({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="gap-2">Filters</Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full md:w-[400px] flex flex-col gap-4"
        sideOffset={8}
        align="start">
        <div className="flex items-center gap-2">
          <Settings2Icon strokeWidth={1.5} />
          <h3 className="text-lg font-bold">Filters</h3>
        </div>
        {children}
        <PopoverClose asChild>
          <button className="absolute top-4 right-4">
            <XIcon strokeWidth={1.5} width={20} height={20} />
          </button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}

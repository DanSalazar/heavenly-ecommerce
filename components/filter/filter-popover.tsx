import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function FilterPopover({
  children
}: {
  children: React.ReactNode
}) {
  const t = useTranslations('sorting')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="gap-2">{t('filters')}</Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex lg:w-[400px] flex-col gap-4"
        sideOffset={8}
        align="start">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">{t('filters')}</h3>
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

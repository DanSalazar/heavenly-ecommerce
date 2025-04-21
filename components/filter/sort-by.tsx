import { useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import useUrlState from '@/hooks/useUrlState'

export default function SortBy() {
  const t = useTranslations('sorting')
  const { add, remove, getState } = useUrlState()

  return (
    <div className="ml-auto w-[200px] flex items-center gap-2 text-muted-foreground">
      <span className="text-sm ">{t('sortBy')}</span>
      <Select
        defaultValue="relevance"
        value={getState('order') || ''}
        onValueChange={value => {
          if (value === 'relevance') remove('order')
          else add('order', value)
        }}>
        <SelectTrigger className="border-none flex-1 px-0 outline-none text-primary font-medium">
          <SelectValue placeholder={t('relevance')}></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">{t('relevance')}</SelectItem>
          <SelectItem value="low to high">{t('priceLowToHigh')}</SelectItem>
          <SelectItem value="high to low">{t('priceHighToLow')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

import { useTranslations } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export default function PaymentDeliveryAccordion() {
  const t = useTranslations('payment')

  return (
    <Accordion type="single" defaultValue={'item-1'} collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="uppercase">
          {t('delivery')}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <p>
            <span className="font-medium">{t('paymentOptionsTitle')}:</span>{' '}
            {t('paymentOptionsDescription')}
          </p>
          <p>
            <span className="font-medium">{t('shippingTitle')}:</span>{' '}
            {t('shippingDescription')}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

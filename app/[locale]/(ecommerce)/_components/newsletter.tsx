import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RunShoes from '@/public/run-shoes.webp'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Newsletter() {
  const t = useTranslations('newsletter')

  return (
    <div className="flex flex-col lg:flex-row justify-between py-8 gap-4 lg:gap-8">
      <Image
        src={RunShoes}
        width={700}
        height={700}
        alt="Running shoes"
        className="object-cover object-left"
      />
      <section className="lg:w-2/4 flex flex-col gap-4">
        <h2 className="text-xl sm:text-3xl lg:text-5xl font-semibold">
          {t('subscribeTitle')}
        </h2>
        <p className="text-foreground text-sm md:text-base">
          {t('subscribeSubtitle')}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Input placeholder={t('emailPlaceholder')} />
          <Button className="w-full md:w-auto shadow-md gap-2">
            {t('subscribeButton')}
          </Button>
        </div>
      </section>
    </div>
  )
}

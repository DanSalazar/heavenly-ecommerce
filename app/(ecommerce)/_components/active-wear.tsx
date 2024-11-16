import { marcellus } from '@/components/fonts'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function ActiveWear() {
  return (
    <>
      <div className="flex justify-center items-center relative h-[500px] bg-gradient-to-r from-zinc-700 to-zinc-900 px-8 md:px-12">
        <div className="z-10 flex flex-col justify-center gap-2 w-full lg:w-[600px] md:h-3/4 border border-white">
          <h2
            className={
              marcellus.className +
              ' text-center text-white font-bold text-2xl sm:text-3xl md:text-8xl uppercase word-break'
            }>
            Style. Technical. Innovate
          </h2>
          <Link
            href={'/search'}
            className={buttonVariants({ variant: 'link' }) + ' text-white'}>
            Shop Clothing
          </Link>
        </div>
      </div>

      <div className="flex gap-4 overflow-hidden p-4 bg-primary text-white font-medium uppercase">
        {Array(5)
          .fill('FREE SHIPPING ON ALL DOMESTIC ORDERS, ')
          .map((text, index) => (
            <p className="whitespace-nowrap text-sm" key={index}>
              {text}
            </p>
          ))}
      </div>
    </>
  )
}

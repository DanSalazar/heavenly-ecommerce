import { marcellus } from '@/components/fonts'
import Run from '@/public/run.webp'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function ActiveWear() {
  return (
    <>
      <div className="flex justify-end items-center relative h-[500px] px-8 md:px-12">
        <Image
          className="object-cover object-left"
          fill
          alt="Men preparing to run"
          src={Run}
        />

        <div
          className="absolute top-0 right-0 bottom-0 left-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }}></div>
        <div className="z-10 flex flex-col justify-center w-full lg:w-[600px] md:h-3/4 border border-white">
          <h2
            className={
              marcellus.className +
              ' text-center text-white font-bold text-2xl sm:text-3xl md:text-7xl uppercase word-break'
            }>
            Style. Technical. Innovate
          </h2>
          <Button size={'sm'} className="text-white" variant={'link'}>
            Shop Active Wear
          </Button>
        </div>
      </div>

      <div className="flex gap-8 overflow-hidden p-4 bg-primary text-white font-medium uppercase">
        {Array(4)
          .fill('LOOK BETTER, WEAR COMFORTABLE ACTIVE WEAR')
          .map((text, index) => (
            <p className="whitespace-nowrap text-sm" key={index}>
              {text}
            </p>
          ))}
      </div>
    </>
  )
}

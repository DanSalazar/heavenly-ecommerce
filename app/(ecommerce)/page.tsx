// import Image from 'next/image'
// import Hero from '@/public/billboard.jpg'
import { Suspense } from 'react'
import { ProductsWrapperSkeleton } from '@/components/skeletons'
import FeaturedProducts from './_components/featured-products'
import Newsletter from './_components/newsletter'
// import { marcellus } from '@/components/fonts'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
import ActiveWear from './_components/active-wear'

export default function Page() {
  return (
    <main className="">
      {/* <div className="flex justify-between h-[520px] bg-zinc-50">
        <div className="flex text-center lg:text-start items-center justify-center flex-col gap-4 lg:p-20 lg:w-2/4">
          <h1
            className={cn(
              'uppercase text-2xl sm:text-3xl md:text-6xl',
              marcellus.className
            )}>
            Crafted to seamlessly blend fashion with function
          </h1>
          <Button
            size="sm"
            className="uppercase lg:self-start rounded-full p-4">
            Shop new arrivals
          </Button>
        </div>
        <Image
          alt="Hero"
          className="hidden lg:block object-cover w-2/4"
          src={Hero}
        />
      </div> */}
      {/* 
      <div className="flex gap-4 overflow-hidden p-4 bg-primary text-white font-medium uppercase">
        {Array(5)
          .fill('FREE SHIPPING ON ALL DOMESTIC ORDERS')
          .map((text, index) => (
            <p className="text-sm whitespace-nowrap" key={index}>
              {text}
            </p>
          ))}
      </div> */}

      <ActiveWear />

      <Suspense fallback={<ProductsWrapperSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <Newsletter />
    </main>
  )
}

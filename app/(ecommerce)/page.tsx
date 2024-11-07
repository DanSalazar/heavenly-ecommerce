import Image from 'next/image'
import Hero from '@/public/billboard.jpg'
import About from './_components/about'
import { Suspense } from 'react'
import { ProductsWrapperSkeleton } from '@/components/skeletons'
import FeaturedProducts from './_components/featured-products'
import Newsletter from './_components/newsletter'

export default function Page() {
  return (
    <main className="">
      <div className="mb-4 -z-10 relative flex md:items-center md:justify-center overflow-hidden h-[520px]">
        <div
          className="absolute top-0 right-0 bottom-0 left-0 -z-20"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}></div>
        <Image alt="Hero" className="object-cover -z-30" src={Hero} />
        <p className="absolute top-[40%] px-8 z-20 text-white font-semibold text-2xl md:text-5xl xl:text-6xl text-center">
          Level up your style with our collections
        </p>
      </div>

      <About />

      <Suspense fallback={<ProductsWrapperSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <Newsletter />
    </main>
  )
}

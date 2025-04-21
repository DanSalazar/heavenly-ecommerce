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
      <ActiveWear />

      <Suspense fallback={<ProductsWrapperSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <Newsletter />
    </main>
  )
}

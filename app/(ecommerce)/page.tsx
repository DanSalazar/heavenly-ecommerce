import Image from 'next/image'
import Hero from '@/public/billboard.jpg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ProductsWrapper from '@/components/ecommerce/products-wrapper'
import { db } from '@/db'
import ProductComponent from '@/components/ecommerce/product-component'
import { Mail } from 'lucide-react'

export default async function Page() {
  const featuredProducts = await db.query.product.findMany({
    where: ({ featured }, { eq }) => eq(featured, true),
    limit: 4
  })

  return (
    <main className="flex flex-col gap-8">
      <div className="-z-10 relative flex md:items-center md:justify-center overflow-hidden h-[520px]">
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
      <section>
        <h2 className="font-semibold text-2xl mb-4">Featured Products</h2>
        <ProductsWrapper>
          {featuredProducts.map(product => (
            <ProductComponent key={product.id} product={product} />
          ))}
        </ProductsWrapper>
      </section>
      <div className="h-[300px] flex flex-col gap-2 items-center justify-center border-t border-zinc-200">
        <p className="text-xl xl:px-40 xl:text-5xl font-bold text-center">
          Subscribe to our newsletter to get updates to our latest collections
        </p>
        <p className="text-zinc-600 text-sm md:text-base text-center">
          Get 20% off on your first order just by subscribing to our newsletter
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Input
            placeholder="Email your email"
            className="shadow xl:w-[250px]"
          />
          <Button className="shadow-md gap-2">
            Subscribe
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}

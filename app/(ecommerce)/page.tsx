import Image from 'next/image'
import Hero from '@/public/billboard.jpg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <main className="flex flex-col gap-8">
      <div className="relative flex md:items-center md:justify-center overflow-hidden h-[520px]">
        <div
          className="absolute top-0 right-0 bottom-0 left-0 -z-20"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}></div>
        <Image
          alt="Hero"
          objectPosition="bottom"
          className="object-cover -z-30"
          src={Hero}
        />
        <p className="absolute top-[40%] px-8 z-20 text-white font-semibold text-2xl md:text-5xl xl:text-6xl text-center">
          Level up your style with our collections
        </p>
      </div>
      <section>
        <h2 className="font-semibold text-xl">Featured Products</h2>
      </section>
      <div className="h-[300px] flex flex-col gap-2 items-center justify-center border-t border-zinc-200">
        <p className="text-xl xl:px-48 xl:text-4xl font-bold text-center">
          Subscribe to our newsletter to get updates to our latest collections
        </p>
        <p className="text-zinc-600 text-sm md:text-base text-center">
          Get 20% off on your first order just by subscribing to our newsletter
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
          <Input
            placeholder="Email your email"
            className="shadow xl:w-[250px]"
          />
          <Button className="shadow-md w-28">Subscribe</Button>
        </div>
      </div>
    </main>
  )
}

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RunShoes from '@/public/run-shoes.webp'
import Image from 'next/image'

export default function Newsletter() {
  return (
    <div className="flex flex-col lg:flex-row justify-between py-8 gap-4 lg:gap-8">
      <Image
        src={RunShoes}
        width={700}
        height={700}
        alt="Running shoes"
        className="rounded-md object-cover object-left"
      />
      <section className="lg:w-2/4 flex flex-col gap-2">
        <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold">
          Subscribe to our newsletter to get updates to our latest collections
        </h2>
        <p className="text-foreground text-sm md:text-base">
          Get 20% off on your first order just by subscribing to our newsletter
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Input placeholder="Email your email" className="xl:w-[250px]" />
          <Button className="w-full md:w-auto shadow-md gap-2">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  )
}

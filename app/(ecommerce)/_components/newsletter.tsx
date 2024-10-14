import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Newsletter() {
  return (
    <section className="mt-8 h-[300px] flex flex-col gap-2 items-center justify-center border-t border-zinc-200">
      <h2 className="text-xl xl:px-36 xl:text-4xl font-bold text-center">
        Subscribe to our newsletter to get updates to our latest collections
      </h2>
      <p className="text-foreground text-sm md:text-base text-center">
        Get 20% off on your first order just by subscribing to our newsletter
      </p>
      <div className="flex flex-col md:flex-row items-center gap-2">
        <Input placeholder="Email your email" className="shadow xl:w-[250px]" />
        <Button className="shadow-md gap-2">Subscribe</Button>
      </div>
    </section>
  )
}

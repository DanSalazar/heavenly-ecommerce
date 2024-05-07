import ProductComponent from '@/components/ecommerce/product'
import { MarkIcon, PlusIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { product } from '@/lib/data'

export default function Page({ params }: { params: { department: string } }) {
  return (
    <main className="flex flex-col gap-4 mt-12">
      <h2 className="text-6xl font-semibold uppercase">{params.department}</h2>
      <div className="relative flex gap-2">
        <Button className="uppercase">Filters</Button>
        <div className="my-1 border-r border-zinc-300" />
        <div className="hidden md:flex gap-2 w-[80%] overflow-hidden">
          <Button variant={'custom'}>
            Tops <MarkIcon className="ml-1" />
          </Button>
          <Button variant={'custom'}>
            Size M <MarkIcon className="ml-1" />
          </Button>
        </div>
        <Button className="absolute right-0" variant={'custom'}>
          Sort By <PlusIcon className="ml-1" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 border-t py-4 border-zinc-200">
        <ProductComponent product={product} />
      </div>
    </main>
  )
}

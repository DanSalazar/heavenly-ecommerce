'use client'
import { useState } from 'react'

import ProductComponent from '@/components/ecommerce/product'
import { MarkIcon, PlusIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { product } from '@/lib/data'
import { Filter, FilterChildren } from '@/components/filter'
import { Input } from '@/components/ui/input'
import SortBy from '@/components/filter/sort-by'

export default function Page({ params }: { params: { department: string } }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  return (
    <main className="flex flex-col gap-4 mt-12">
      <h2 className="text-7xl font-semibold uppercase break-words">
        {params.department}
      </h2>
      <div className="h-10 relative flex gap-2">
        <Button className="uppercase" onClick={handleOpen}>
          Filters
        </Button>
        <div className="my-1 border-r border-zinc-300" />
        <div className="hidden md:flex gap-2 w-[80%] overflow-hidden">
          <Button variant={'custom'}>
            Sneakers <MarkIcon className="ml-1" />
          </Button>
          <Button variant={'custom'}>
            Size M <MarkIcon className="ml-1" />
          </Button>
        </div>
        <SortBy />
        <Filter
          onClose={handleOpen}
          className="absolute top-12 left-0 w-full md:w-[300px]"
          open={open}>
          <FilterChildren title="Sizes">
            <Input placeholder="Size" />
          </FilterChildren>
        </Filter>
      </div>
      <div className="flex flex-wrap gap-4 border-t py-4 border-zinc-200">
        <ProductComponent product={product} />
      </div>
    </main>
  )
}

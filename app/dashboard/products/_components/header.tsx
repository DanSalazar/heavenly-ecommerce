'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FilterProducts from './filter-products'

export default function Header() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  return (
    <div className="relative flex gap-2">
      <Input placeholder="Search a product by name" />
      <FilterProducts open={open} onClose={handleOpen} />
      <Button>Add Product</Button>
      <Button onClick={handleOpen}>Filters</Button>
    </div>
  )
}

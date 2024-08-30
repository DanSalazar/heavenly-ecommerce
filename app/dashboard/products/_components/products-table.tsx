'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Product } from '@/db/schema'
import Image from 'next/image'
import { MoreHorizontalIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/server/actions'
import Link from 'next/link'
import { formatDate, formatPrice } from '@/utils'

export default function ProductsTable({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[120px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead className="w-[80px]">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="72"
                src={product.thumbnail}
                width="72"
              />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              ${formatPrice(product.price)}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDate(product.created_at)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link
                      className="flex-1"
                      href={`products/edit/${product.id}`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      await deleteProduct(product.id)
                    }}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

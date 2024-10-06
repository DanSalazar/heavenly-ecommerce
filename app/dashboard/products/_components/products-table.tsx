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
import Image from 'next/image'
import { MoreHorizontalIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDate, formatPrice } from '@/utils'
import { deleteProduct } from '@/actions/product'
import { useToast } from '@/components/ui/use-toast'
import { Product } from '@/db/types'

export default function ProductsTable({ products }: { products: Product[] }) {
  const { toast } = useToast()

  const handleDeleteProduct = async (id: string) => {
    const result = await deleteProduct({ id })

    if (
      result?.serverError ||
      result?.validationErrors ||
      result?.data?.error
    ) {
      toast({
        title: 'Deletion Failed',
        description:
          result?.serverError ||
          result.data?.error ||
          'Unable to delete the product. Please try again.',
        variant: 'destructive'
      })

      return
    }

    toast({
      title: 'Product Deleted Successfully',
      description: 'The product has been removed from your inventory.'
    })
  }

  return (
    <Table className="table-fixed">
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
                className="rounded-md object-cover"
                height="72"
                src={product.thumbnail}
                width="72"
              />
            </TableCell>
            <TableCell className="font-medium break-words">
              {product.name}
            </TableCell>
            <TableCell className="hidden md:table-cell font-medium">
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
                  <DropdownMenuItem>
                    <button
                      className="flex-1 text-left"
                      onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
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

import Price from '@/components/ecommerce/price'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
// import { getProducts } from '@/server/actions'

const TableHeaderData = [
  'Product Name',
  'Department',
  'Category',
  'Sizes',
  'Price'
]

export default async function Page() {
  // const products = await getProducts()

  return (
    <>
      <div className="flex gap-2">
        <Input />
        <Button>Filters</Button>
        <Button>Add Product</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-t">
            {TableHeaderData.map(h => (
              <TableHead>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {/*  <TableBody>
          {products.map((product, i) => (
            <TableRow>
              <TableCell className="">
                <div className="w-[400px] font-medium truncate">
                  {product.name}
                </div>
              </TableCell>
              <TableCell className="capitalize">{product.department}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="">{product.sizes} </TableCell>
              <TableCell>
                <Price price={product.price} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>*/}
      </Table>
    </>
  )
}

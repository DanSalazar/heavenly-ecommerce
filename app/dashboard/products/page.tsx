import Price from '@/components/ecommerce/price'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { getProducts } from '@/server/actions'
import Header from './_components/header'

const TableHeaderData = [
  'Product Name',
  'Brand',
  'Department',
  'Price',
  'Discount'
]

export default async function Page({
  searchParams
}: {
  searchParams: unknown
}) {
  const products = await getProducts('', searchParams)

  return (
    <>
      <Header />
      <Table>
        <TableHeader>
          <TableRow className="border-t">
            {TableHeaderData.map(h => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!products.length &&
            products.map(({ product }, i) => (
              <TableRow key={product.id} className="h-[60px]">
                <TableCell className="">
                  <div className="font-medium truncate">{product.name}</div>
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell className="capitalize">
                  {product.department}
                </TableCell>
                <TableCell>
                  <Price price={product.price} />
                </TableCell>
                <TableCell>
                  <Badge variant={'outline'}>
                    {product.percentage_off || 0}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

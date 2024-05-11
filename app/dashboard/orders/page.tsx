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

const TableHeaderData = [
  'Customer Name',
  'Product Name',
  'Order ID',
  'Date',
  'Price',
  'Status'
]

export default function Page() {
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
        <TableBody></TableBody>
      </Table>
    </>
  )
}

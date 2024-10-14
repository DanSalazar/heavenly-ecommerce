'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { centsToPrice } from '@/lib/utils'
import { formatDate, formatPrice } from '@/lib/utils'
import { OrderType } from '@/db/types'

export default function OrdersTable({ orders }: { orders: OrderType[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden sm:table-cell">Type</TableHead>
          <TableHead className="hidden md:table-cell">Payment Method</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Sale</TableCell>
            <TableCell className="hidden sm:table-cell">
              {order.payment_method}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-sm" variant="secondary">
                {order.order_status}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDate(order.order_created_at)}
            </TableCell>
            <TableCell className="text-right font-medium">
              ${formatPrice(centsToPrice(order.total_amount))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

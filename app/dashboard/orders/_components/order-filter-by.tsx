'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'
import { ListFilterIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import useUrlState from '@/hooks/useUrlState'

export default function OrderFilterBy() {
  const { add, getState } = useUrlState()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 gap-1">
          <ListFilterIcon />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter By
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Payment Method</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={getState('payment_method') === 'card'}
          onCheckedChange={val => {
            if (val) add('payment_method', 'card')
            else add('payment_method', '')
          }}>
          Credit Card
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={getState('payment_method') === 'paypal'}
          onCheckedChange={val => {
            if (val) add('payment_method', 'paypal')
            else add('payment_method', '')
          }}>
          Paypal
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

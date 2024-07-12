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

export default function FilterByProducts() {
  const { add, getState } = useUrlState()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 gap-1">
          <ListFilterIcon />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter by
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Product Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={getState('status') === 'active'}
          onCheckedChange={val => {
            if (val) add('status', 'active')
            else add('status', '')
          }}>
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={getState('status') === 'archived'}
          onCheckedChange={val => {
            if (val) add('status', 'archived')
            else add('status', '')
          }}>
          Archived
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

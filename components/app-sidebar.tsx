'use client'

import * as React from 'react'
import { Home, Package, Settings2, ShoppingBag } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { NavSecondary } from './nav-secondary'

const data = {
  navMain: [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home
    },
    {
      title: 'Products',
      url: '/dashboard/products',
      icon: Package
    },
    {
      title: 'Orders',
      url: '/dashboard/orders',
      icon: ShoppingBag
    },
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: Settings2
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
        <NavMain items={data.navMain} />
      </SidebarHeader>

      <SidebarContent>
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

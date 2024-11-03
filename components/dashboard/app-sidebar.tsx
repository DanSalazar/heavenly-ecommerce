'use client'

import * as React from 'react'
import { Command, Home, Package, Settings2, ShoppingBag } from 'lucide-react'

import { NavMain } from '@/components/dashboard/nav-main'
import { TeamSwitcher } from '@/components/dashboard/team-switcher'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { useUser } from '@clerk/nextjs'
import { NavUser } from './user-sidebar'
import ToggleTheme from './toggle-theme'

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
  ],
  teams: [
    {
      name: 'Heavenly',
      logo: Command,
      plan: 'Enterprise'
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  const userData = {
    name: user?.username || 'Admin',
    email: user?.emailAddresses[0].emailAddress!,
    avatar: user?.imageUrl!
  }

  return (
    <Sidebar collapsible="icon" className="border-r-0" {...props}>
      <SidebarHeader className="flex-row flex-wrap">
        <TeamSwitcher teams={data.teams} />
        <ToggleTheme className="ml-auto" />
      </SidebarHeader>

      <NavMain items={data.navMain} />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="space-y-2">
            <NavUser user={userData} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

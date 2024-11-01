'use client'

import * as React from 'react'
import { Command, Home, Package, Settings2, ShoppingBag } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import ToggleTheme from '@/app/dashboard/_components/toggle-theme'
import { useUser } from '@clerk/nextjs'
import { NavUser } from './user-sidebar'

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
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <NavMain items={data.navMain} />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="space-y-2">
            <ToggleTheme />
            <NavUser user={userData} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

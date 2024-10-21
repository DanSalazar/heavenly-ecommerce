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
import { useAuth, UserButton, useUser } from '@clerk/nextjs'
import ToggleTheme from '@/app/dashboard/_components/toggle-theme'

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
  const auth = useUser()
  const userEmail = auth.user?.primaryEmailAddress?.emailAddress

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <NavMain items={data.navMain} />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      height: 42,
                      width: 42
                    }
                  }
                }}
              />
              <p className="font-medium text-sm">{userEmail}</p>
              <ToggleTheme className="ml-auto" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

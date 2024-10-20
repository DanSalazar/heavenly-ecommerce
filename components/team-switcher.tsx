import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { marcellus } from './fonts'

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-1 p-1.5">
        <p className={cn('font-semibold text-xl', marcellus.className)}>
          HEAVENLY
        </p>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { capitalizeWord } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export default function Header() {
  const pathname = usePathname()
  const pathnameSplit = pathname.split('/')

  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {pathnameSplit.map((path, idx) => {
              if (path === '') return null
              return (
                <Fragment key={idx}>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      {capitalizeWord(path)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  {idx < pathnameSplit.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

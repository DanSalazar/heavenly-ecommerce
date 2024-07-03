'use client'

import { createPathObject } from '@/utils'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb'
import { Fragment } from 'react'

export default function BreadcrumbWrapper({ pathname }: { pathname?: string }) {
  const currentPathname = usePathname()
  const pathObject = createPathObject(pathname || currentPathname)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathObject.map((item, i) => (
          <Fragment key={item.href}>
            <BreadcrumbItem>
              {i < pathObject.length - 1 ? (
                <BreadcrumbLink
                  className="uppercase font-medium"
                  href={item.href}>
                  {item.title}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="uppercase font-medium">
                  {item.title}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {i < pathObject.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

'use client'

import { createPathObject } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from '../icons'

export default function Breadcumb() {
  const pathname = usePathname()
  const pathObject = createPathObject(pathname)

  return (
    <div className="flex gap-2">
      {pathObject.map((path, i) => (
        <div
          key={path.href + i}
          className="flex items-center gap-2 overflow-hidden">
          <Link
            href={path.href}
            className={clsx(
              'text-zinc-500 uppercase text-sm md:text-base hover:text-black truncate',
              {
                'text-primary font-semibold pointer-events-none':
                  i === pathObject.length - 1
              }
            )}>
            {path.name}
          </Link>
          {i + 1 < pathObject.length && <ArrowRight width={14} height={14} />}
        </div>
      ))}
    </div>
  )
}

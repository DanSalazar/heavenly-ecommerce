'use client'

import { createPathObject } from "@/utils"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "../icons"

export default function Breadcumb() {
  const pathname = usePathname()
  const pathObject = createPathObject(pathname)

  return (
    <div className="flex gap-2">
      {pathObject.map((path, i) => (
        <div className="flex items-center gap-2 overflow-hidden">
          <Link
            href={path.href}
            key={path.name}
            className={clsx('text-zinc-500 uppercase text-sm md:text-base hover:text-black truncate', {
              'text-primary font-semibold pointer-events-none': i === pathObject.length - 1
            })}>
            {path.name}
          </Link>
          {i + 1 < pathObject.length && <ArrowRight />}
        </div>
      ))}
    </div>
  )
}

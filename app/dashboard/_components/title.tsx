'use client'

import { usePathname } from 'next/navigation'

export default function Title() {
  const pathname = usePathname()
  const pathSplitted = pathname.split('/')
  const title = pathSplitted[pathSplitted.length - 1]

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="capitalize font-semibold text-xl xl:text-2xl">{title}</p>
        <span className="text-zinc-700 dark:text-zinc-100 capitalize">
          Monitor your sales revenue here.
        </span>
      </div>
    </header>
  )
}

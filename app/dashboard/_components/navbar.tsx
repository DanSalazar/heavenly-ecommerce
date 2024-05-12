import HeavenlyIcon from '@/components/heavenly-icon'
import { Button } from '@/components/ui/button'
import Navigation from './navigation'

export default function Navbar() {
  return (
    <header className="border-b xl:border-r border-zinc-200 dark:border-zinc-700 flex xl:min-h-screen md:w-1/6 p-4 xl:py-6">
      <div className="text-center flex-1 flex flex-col gap-4">
        <HeavenlyIcon />
        <Navigation />
      </div>
    </header>
  )
}

import HeavenlyIcon from '@/components/heavenly-icon'
import { Button } from '@/components/ui/button'
import Navigation from './navigation'

export default function Navbar() {
  return (
    <header className="border-b xl:border-r border-zinc-300 dark:border-zinc-700 xl:min-h-screen w-1/6 p-4 xl:py-6 flex">
      <div className="text-center flex-1 flex flex-col gap-4">
        <HeavenlyIcon />
        <Navigation />
      </div>
    </header>
  )
}

'use client'

import { useThemeContext } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function ToggleTheme({ className }: { className?: string }) {
  const theme = useThemeContext()

  return (
    <Button
      variant={'ghost'}
      title="Toggle Theme"
      size="icon"
      className={className}
      onClick={theme?.toggleTheme}>
      <span className="sr-only">Toggle Theme</span>
      {theme?.isDarkTheme ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

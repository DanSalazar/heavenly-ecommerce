'use client'

import { MoonIcon, SunIcon } from '@/components/icons'
import { useThemeContext } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'

export default function ToggleTheme() {
  const theme = useThemeContext()

  return (
    <Button
      variant={'outline'}
      title="Toggle Theme"
      size="icon"
      className="rounded-full"
      onClick={theme?.toggleTheme}>
      <span className="sr-only">Toggle Theme</span>
      {theme?.isDarkTheme ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

'use client'

import { MoonIcon, SunIcon } from '@/components/icons'
import { useThemeContext } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'

export default function ToggleTheme() {
  const theme = useThemeContext()

  return (
    <Button variant={'outline'} className="gap-2" onClick={theme?.toggleTheme}>
      Toggle Theme {theme?.isDarkTheme ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

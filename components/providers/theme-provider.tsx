'use client'

import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext<{
  isDarkTheme: boolean
  toggleTheme: () => void
} | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)

  if (typeof context === 'undefined' || context === null) {
    throw new Error('You must use useThemeContext inside ThemeContextProvider')
  }

  return context
}

'use client'

import { UserProfile } from '@clerk/nextjs'
import { useThemeContext } from '../providers/theme-provider'
import { dark } from '@clerk/themes'

export default function UserProfileComponent() {
  const { isDarkTheme } = useThemeContext()

  return (
    <UserProfile
      appearance={{
        baseTheme: isDarkTheme ? dark : undefined,
        elements: {
          rootBox: {
            width: 'auto'
          },
          cardBox: {
            width: '100%',
            border: 'none'
          },
          scrollBox: {
            borderRadius: '0'
          }
        }
      }}
    />
  )
}

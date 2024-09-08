import { useThemeContext } from '@/components/providers/theme-provider'
import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function User() {
  const { isDarkTheme } = useThemeContext()

  return (
    <UserButton
      userProfileProps={{
        appearance: {
          baseTheme: isDarkTheme ? dark : undefined
        }
      }}
      appearance={{
        baseTheme: isDarkTheme ? dark : undefined,
        elements: {
          userButtonAvatarBox: 'h-10 w-10'
        }
      }}
    />
  )
}

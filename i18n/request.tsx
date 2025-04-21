import { getRequestConfig } from 'next-intl/server'
import { LOCALES } from '@/lib/constants'
import { cookies, headers } from 'next/headers'

export default getRequestConfig(async params => {
  const acceptLanguage = (await headers()).get('accept-language')
  const cookieLocale = (await cookies()).get('NEXT_LOCALE')?.value

  let locale = cookieLocale

  if (!locale && acceptLanguage) {
    const browserLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase()

    if (LOCALES.includes(browserLocale as any)) {
      locale = browserLocale
    }
  }

  if (!locale || !LOCALES.includes(locale as any)) {
    locale = 'en'
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale
  }
})

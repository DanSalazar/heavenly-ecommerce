import type { Metadata } from 'next'
import '../../globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { mainFont } from '@/components/fonts'
import { Toaster } from '@/components/ui/toaster'
import { ShoppingBagProvider } from '@/components/providers/shopping-bag-provider'
import GoToTopButton from '@/components/go-to-top-button'
import { cn } from '@/lib/utils'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.root.title')
  return {
    title: {
      template: t('template'),
      default: t('default')
    }
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <ShoppingBagProvider>
          <body
            className={cn('flex flex-col !px-4 md:!px-12', mainFont.className)}>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
            <GoToTopButton />
          </body>
        </ShoppingBagProvider>
      </NextIntlClientProvider>
    </html>
  )
}

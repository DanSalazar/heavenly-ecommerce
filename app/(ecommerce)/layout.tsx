import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { mainFont } from '@/components/fonts'
import { Toaster } from '@/components/ui/toaster'
import { ShoppingBagProvider } from '@/components/providers/shopping-bag-provider'
import GoToTopButton from '@/components/go-to-top-button'

export const metadata: Metadata = {
  title: {
    template: '%s | Heavenly',
    default: 'Heavenly'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ShoppingBagProvider>
        <body
          className={
            mainFont.className + ' flex flex-col gap-4 !px-4 md:!px-12'
          }>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <GoToTopButton />
        </body>
      </ShoppingBagProvider>
    </html>
  )
}

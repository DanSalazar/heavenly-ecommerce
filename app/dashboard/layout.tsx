import type { Metadata } from 'next'
import './dashboard.css'
import Providers from '@/components/providers'
import { mainFont } from '@/components/fonts'
import { Toaster } from '@/components/ui/toaster'
import { ClerkProvider, SignedIn } from '@clerk/nextjs'
import Header from './_components/header'
import Sidebar from './_components/sidebar'

export const metadata: Metadata = {
  title: {
    template: '%s | Heavenly Dashboard',
    default: 'Heavenly Dashboard'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}>
      <html lang="en">
        <Providers>
          <body
            className={
              mainFont.className +
              ' grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]'
            }>
            <SignedIn>
              <Sidebar />
              <main className="bg-muted/40 dark:bg-background h-full flex flex-col gap-4">
                <Header />
                <div className="px-6 pb-4">{children}</div>
              </main>
              <Toaster />
            </SignedIn>
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  )
}

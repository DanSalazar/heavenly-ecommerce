import type { Metadata } from 'next'
import Providers from '@/components/providers'
import { mainFont } from '@/components/fonts'
import '../globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ClerkProvider, SignedIn } from '@clerk/nextjs'
import Header from './_components/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/dashboard/app-sidebar'

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
          <body className={mainFont.className}>
            <SignedIn>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <Header />
                  <div className="px-4 pt-2 pb-8">{children}</div>
                </SidebarInset>
              </SidebarProvider>
              <Toaster />
            </SignedIn>
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  )
}

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { LOCALES } from './lib/constants'

const middleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: 'en',
  localePrefix: 'never'
})

const isSignInRoute = createRouteMatcher(['/dashboard/sign-in(.*)'])
const isPrivateRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (isSignInRoute(req) && !userId) {
    return NextResponse.next()
  }

  if (isPrivateRoute(req)) {
    await auth.protect()
    return
  }

  return middleware(req)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}

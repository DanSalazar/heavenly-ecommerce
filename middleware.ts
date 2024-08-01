import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isSignInRoute = createRouteMatcher(['/dashboard/sign-in(.*)'])

const isPrivateRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware((auth, req) => {
  const authObject = auth()

  if (isSignInRoute(req)) {
    return
  }

  if (isPrivateRoute(req) && !isSignInRoute(req)) {
    if (!authObject.sessionId) {
      return authObject.redirectToSignIn()
    }

    authObject.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}

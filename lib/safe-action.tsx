import { auth } from '@clerk/nextjs/server'
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient
} from 'next-safe-action'

class AuthError extends Error {}

export const baseAction = createSafeActionClient({
  handleServerError: error => {
    if (error instanceof AuthError) {
      return error.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  }
})

export const safeAction = baseAction.use(({ next }) => {
  const { userId } = auth()

  if (!userId) {
    throw new AuthError('Access denied.')
  }

  return next({ ctx: { userId } })
})

import { auth } from '@clerk/nextjs/server'
import 'server-only'

export const getUser = async () => {
  return auth().userId
}

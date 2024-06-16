import { Marcellus, Poppins } from 'next/font/google'

export const mainFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})
export const marcellus = Marcellus({ subsets: ['latin'], weight: '400' })

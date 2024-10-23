import { db } from '@/db'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { FacebookIcon, InstagramLogo, XIcon } from './icons'

export default async function SocialMedia() {
  const data = await db.query.shopInformation.findFirst({
    where: ({ id }, { eq }) => eq(id, Number(process.env.SHOP_INFORMATION_ID)),
    columns: {
      facebook: true,
      x: true,
      instagram: true
    }
  })

  if (!data) return <></>

  const { x, instagram, facebook } = data

  const classes = cn(buttonVariants({ size: 'icon' }), 'rounded-full')

  return (
    <div className="flex gap-4">
      <Link
        target="_blank"
        className={classes}
        href={x || '/'}
        aria-label="Visit our X page">
        <XIcon fill="currentColor" width={18} height={18} />
      </Link>
      <Link
        target="_blank"
        className={classes}
        href={instagram || '/'}
        aria-label="Visit our Instagram page">
        <InstagramLogo fill="currentColor" width={18} height={18} />
      </Link>
      <Link
        target="_blank"
        className={classes}
        href={facebook || '/'}
        aria-label="Visit our Facebook page">
        <FacebookIcon fill="currentColor" width={18} height={18} />
      </Link>
    </div>
  )
}

import { db } from '@/db'
import SocialMediaForm from './social-media-form'

export default async function Page() {
  const shopInfo = await db.query.shopInformation.findFirst({})

  return <SocialMediaForm shopInfo={shopInfo!} />
}

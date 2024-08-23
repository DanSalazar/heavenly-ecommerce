import { db } from '@/db'
import SocialMediaForm from './social-media-form'

export default async function Page() {
  const shopInfo = await db.query.shopInformation.findFirst({})

  return (
    <>
      <h1 className="text-3xl font-semibold">Settings</h1>
      <SocialMediaForm shopInfo={shopInfo!} />
    </>
  )
}

import Breadcumb from '@/components/ui/breadcumb'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Breadcumb />
      {children}
    </>
  )
}

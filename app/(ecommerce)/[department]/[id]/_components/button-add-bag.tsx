'use client'

import { Button } from '@/components/ui/button'
import { SpinnerStatus } from '@/components/ui/spinner'
import { useFormStatus } from 'react-dom'

export default function ButtonAddBag() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="h-full flex-1 uppercase">
      {pending ? <SpinnerStatus srOnly="Adding to bag..." /> : 'Add to bag'}
    </Button>
  )
}

'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset
}: {
  error: Error & { message?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-[500px] flex-col items-center justify-center gap-2">
      <h2 className="text-center text-4xl font-semibold">
        Something went wrong!
      </h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}

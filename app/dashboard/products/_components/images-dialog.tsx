import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SCROLLBAR_CLASS } from '@/lib/constants'
import { UploaderProps } from '@/components/uploader/types'
import dynamic from 'next/dynamic'
import { SpinnerStatus } from '@/components/ui/spinner'

const Uploader = dynamic(() => import('@/components/uploader'), {
  loading: () => (
    <div className="h-[200px] flex items-center justify-center">
      <SpinnerStatus />
    </div>
  )
})

export default function ImagesDialog(props: UploaderProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Manage Product Images</Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          'max-w-[700px] max-h-[85%] overflow-y-auto',
          SCROLLBAR_CLASS
        )}>
        <DialogHeader>
          <DialogTitle className="text-3xl">Product Images</DialogTitle>
          <DialogDescription>Manage your product images</DialogDescription>
        </DialogHeader>

        <Uploader {...props} />
      </DialogContent>
    </Dialog>
  )
}

import { XIcon } from 'lucide-react'
import { Button } from '../ui/button'

export default function DeleteItem({
  className,
  deleteAction,
  id
}: {
  className: string
  deleteAction: (id: number) => void
  id: number
}) {
  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={() => {
        deleteAction(id)
      }}
      className={className}>
      <XIcon width={20} height={20} strokeWidth={1.5} />
      <span className="sr-only">Remove item from bag</span>
    </Button>
  )
}

import { XIcon } from 'lucide-react'

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
    <button
      onClick={() => {
        deleteAction(id)
      }}
      className={className}>
      <XIcon width={20} height={20} strokeWidth={1.5} />
      <span className="sr-only">Remove item from bag</span>
    </button>
  )
}

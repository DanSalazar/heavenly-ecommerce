import { MarkIcon } from '../icons'

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
      <MarkIcon width={22} height={22} />
      <span className="sr-only">Remove item from bag</span>
    </button>
  )
}

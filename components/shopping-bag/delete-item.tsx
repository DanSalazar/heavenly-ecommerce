import { deleteItemFromBag } from '@/server/actions'
import { MarkIcon } from '../icons'

export default function DeleteItem({
  className,
  setPending,
  id
}: {
  className: string
  setPending: (bool: boolean) => void
  id: number
}) {
  return (
    <button
      onClick={async () => {
        setPending(true)
        await deleteItemFromBag(id)
        setPending(false)
      }}
      className={className}>
      <MarkIcon width={22} height={22} />
      <span className="sr-only">Remove item from bag</span>
    </button>
  )
}

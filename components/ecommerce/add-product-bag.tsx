'use client'

// import { addProductInBag } from '@/server/actions'
import { Button } from '../ui/button'
import { HeartIcon } from '../icons'
import ButtonAddBag from './button-add-bag'

export default function AddProductInBag({ productId }: { productId: number }) {
  return (
    <form
      // action={async () => {
      //   await addProductInBag('1', productId, 1)
      // }}
      className="flex h-10 flex-wrap gap-2">
      <ButtonAddBag />
      <Button className="h-full" type="button" variant={'outline'}>
        <HeartIcon width={20} height={20} />
      </Button>
    </form>
  )
}

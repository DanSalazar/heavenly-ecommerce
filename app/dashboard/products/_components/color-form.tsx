'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addNewColor } from '@/server/actions'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { SpinnerStatus } from '@/components/ui/spinner'
import { DialogClose } from '@radix-ui/react-dialog'

export function ColorForm() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add a new color</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new color</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData: FormData) => {
            const err = await addNewColor(formData)

            if (err) {
              setError(err)
              return
            }

            setOpen(false)
          }}
          className="grid gap-4 py-4">
          <div className="grid gap-2 ">
            <Label htmlFor="name">Color Name</Label>
            <Input name="name" id="name" placeholder="Red..." />
            {error && <span className="text-red-500 font-medium">{error}</span>}
          </div>
          <Submit />
        </form>
      </DialogContent>
    </Dialog>
  )
}

const Submit = () => {
  const { pending } = useFormStatus()

  return (
    <div className="flex justify-end mt-4 gap-2">
      <DialogClose asChild>
        <Button type="button" variant={'ghost'}>
          Cancel
        </Button>
      </DialogClose>
      <Button disabled={pending} className="w-20" type="submit">
        {pending ? <SpinnerStatus srOnly="Adding new color..." /> : 'Submit'}
      </Button>
    </div>
  )
}

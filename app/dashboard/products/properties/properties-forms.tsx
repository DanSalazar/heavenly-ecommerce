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
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { SpinnerStatus } from '@/components/ui/spinner'
import { DialogClose } from '@radix-ui/react-dialog'
import {
  addNewColor,
  addNewSize,
  addNewCategory,
  deleteColor,
  deleteCategory,
  deleteSize
} from '@/actions/categories'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { XIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const ColorForm = () => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [hexCode, setHexCode] = useState('')

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
          action={async () => {
            const result = await addNewColor({
              hex_code: hexCode,
              name
            })

            if (
              result?.serverError ||
              result?.validationErrors ||
              result?.data?.error
            ) {
              const validationError = result.validationErrors?.hex_code?._errors
                ?.length
                ? 'The HEX Code provided is invalid. Please ensure it starts with "#" and is followed by 6 hexadecimal characters.'
                : false
              toast({
                title: 'Error',
                description:
                  validationError ||
                  result?.serverError ||
                  result.data?.error ||
                  'An unexpected error occurred while trying to add the color. Please try again later.',
                variant: 'destructive'
              })

              return
            }

            setOpen(false)
          }}
          className="grid gap-4 py-4">
          <div className="grid gap-4">
            <Label htmlFor="name">Color Name</Label>
            <Input
              name="name"
              id="name"
              placeholder="Green..."
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <Label htmlFor="hexCode">HEX Code</Label>
            <Input
              id="hexCode"
              name="hexCode"
              value={hexCode}
              onChange={e => setHexCode(e.target.value)}
              placeholder="#FF0000"
            />

            <div className="grid gap-4">
              <Label>Color Preview</Label>
              <div
                className="h-8 w-8 rounded-full border"
                style={{ backgroundColor: hexCode }}></div>
            </div>
          </div>
          <Submit />
        </form>
      </DialogContent>
    </Dialog>
  )
}

const SizeForm = () => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add a new size</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new size</DialogTitle>
        </DialogHeader>
        <form
          action={async () => {
            const result = await addNewSize({
              name
            })

            if (
              result?.serverError ||
              result?.validationErrors ||
              result?.data?.error
            ) {
              toast({
                title: 'Error',
                description:
                  result?.serverError ||
                  result.data?.error ||
                  'Unable to delete the product. Please try again.',
                variant: 'destructive'
              })

              return
            }
            setOpen(false)
          }}
          className="grid gap-4 py-4">
          <div className="grid gap-2 ">
            <Label htmlFor="name">Size Name</Label>
            <Input
              name="name"
              id="name"
              placeholder="XL..."
              onChange={e => setName(e.target.value)}
            />
          </div>
          <Submit />
        </form>
      </DialogContent>
    </Dialog>
  )
}

const CategoryForm = () => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add a new category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new category</DialogTitle>
        </DialogHeader>
        <form
          action={async () => {
            const result = await addNewCategory({
              name
            })

            if (
              result?.serverError ||
              result?.validationErrors ||
              result?.data?.error
            ) {
              toast({
                title: 'Error',
                description:
                  result?.serverError ||
                  result.data?.error ||
                  'Unable to delete the product. Please try again.',
                variant: 'destructive'
              })

              return
            }

            setOpen(false)
          }}
          className="grid gap-4 py-4">
          <div className="grid gap-2 ">
            <Label htmlFor="name">Category Name</Label>
            <Input
              name="name"
              id="name"
              placeholder="Shirts..."
              onChange={e => setName(e.target.value)}
            />
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
        {pending ? <SpinnerStatus srOnly="Adding new size..." /> : 'Submit'}
      </Button>
    </div>
  )
}

const DeleteAlertDialog = ({ children }: { children: React.ReactNode }) => (
  <AlertDialog>
    <AlertDialogTrigger>
      <span className="sr-only">Delete</span>
      <XIcon className="w-4 h-4" strokeWidth={1.5} />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. It will permanently delete the property
          and all its product variants.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        {children}
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

const DeleteColor = ({ id }: { id: number }) => {
  return (
    <DeleteAlertDialog>
      <AlertDialogAction
        onClick={async () => {
          await deleteColor(id)
        }}>
        Delete
      </AlertDialogAction>
    </DeleteAlertDialog>
  )
}

const DeleteSize = ({ id }: { id: number }) => {
  return (
    <DeleteAlertDialog>
      <AlertDialogAction
        onClick={async () => {
          await deleteSize(id)
        }}>
        Delete
      </AlertDialogAction>
    </DeleteAlertDialog>
  )
}

const DeleteCategory = ({ id }: { id: number }) => {
  return (
    <DeleteAlertDialog>
      <AlertDialogAction
        onClick={async () => {
          await deleteCategory(id)
        }}>
        Delete
      </AlertDialogAction>
    </DeleteAlertDialog>
  )
}

export {
  ColorForm,
  SizeForm,
  CategoryForm,
  DeleteCategory,
  DeleteSize,
  DeleteColor
}

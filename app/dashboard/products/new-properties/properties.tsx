import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  deleteCategory,
  deleteColor,
  deleteSize
} from '../new-properties/actions'
import { CategoryForm, ColorForm, SizeForm } from './properties-forms'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { MarkIcon } from '@/components/icons'
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
import { db } from '@/db'

const PropertyTable = ({
  children,
  title
}: {
  children: React.ReactNode
  title: string
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full">{title}</TableHead>
          <TableHead>
            <span className="sr-only">Delete</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  )
}

const Colors = async () => {
  const colors = await await db.query.color.findMany({})

  return (
    <CardWrapper
      property={colors}
      title="Colors"
      description="Manage all product colors"
      dialog={<ColorForm />}
      action={deleteColor}></CardWrapper>
  )
}

const Sizes = async () => {
  const sizes = await db.query.size.findMany({})

  return (
    <CardWrapper
      property={sizes}
      title="Sizes"
      description="Manage all product sizes"
      dialog={<SizeForm />}
      action={deleteSize}></CardWrapper>
  )
}

const Categories = async () => {
  const categories = await db.query.category.findMany({})

  return (
    <CardWrapper
      property={categories}
      title="Categories"
      description="Manage all product categories"
      dialog={<CategoryForm />}
      action={deleteCategory}></CardWrapper>
  )
}

type Property = {
  id: number
  name: string
}

const CardWrapper = ({
  property,
  title,
  description,
  dialog,
  action
}: {
  property: Property[]
  title: string
  description: string
  dialog: React.ReactNode
  action: (formData: FormData) => void
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <PropertyTable title={title}>
          {property.length &&
            property.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium capitalize">
                  {item.name}
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <span className="sr-only">Delete</span>
                      <MarkIcon />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. It will permanently
                          delete the property and all its product variants.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form action={action}>
                          <input
                            type="hidden"
                            value={item.id}
                            name="id"></input>
                          <AlertDialogAction
                            type="submit"
                            className="bg-destructive hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </form>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
        </PropertyTable>
      </CardContent>
      <CardFooter className="justify-end">{dialog}</CardFooter>
    </Card>
  )
}

export { Colors, Sizes, Categories }

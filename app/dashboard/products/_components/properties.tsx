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
  deleteSize,
  getCategories,
  getColors,
  getSizes
} from '@/server/actions'
import { CategoryForm, ColorForm, SizeForm } from './properties-form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MarkIcon } from '@/components/icons'

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
  const colors = await getColors()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Colors</CardTitle>
        <CardDescription>Manage all product colors</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <PropertyTable title="Color Name">
          {colors.length &&
            colors.map(color => (
              <TableRow key={color.id}>
                <TableCell className="font-medium capitalize">
                  {color.name}
                </TableCell>
                <TableCell>
                  <form action={deleteColor}>
                    <input type="hidden" value={color.id} name="id"></input>
                    <Button variant={'ghost'} size={'sm'}>
                      <span className="sr-only">Delete</span>
                      <MarkIcon />
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
        </PropertyTable>
      </CardContent>
      <CardFooter className="justify-end">
        <ColorForm />
      </CardFooter>
    </Card>
  )
}

const Sizes = async () => {
  const sizes = await getSizes()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sizes</CardTitle>
        <CardDescription>Manage all product sizes</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <PropertyTable title="Size name">
          {sizes.length &&
            sizes.map(size => (
              <TableRow key={size.id}>
                <TableCell className="font-medium uppercase">
                  {size.name}
                </TableCell>
                <TableCell>
                  <form action={deleteSize}>
                    <input type="hidden" value={size.id} name="id"></input>
                    <Button variant={'ghost'} size={'sm'}>
                      <span className="sr-only">Delete</span>
                      <MarkIcon />
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
        </PropertyTable>
      </CardContent>
      <CardFooter className="justify-end">
        <SizeForm />
      </CardFooter>
    </Card>
  )
}

const Categories = async () => {
  const categories = await getCategories()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Categories</CardTitle>
        <CardDescription>Manage all product categories</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <PropertyTable title="Category name">
          {categories.length &&
            categories.map(category => (
              <TableRow key={category.id}>
                <TableCell className="font-medium capitalize">
                  {category.name}
                </TableCell>
                <TableCell>
                  <form action={deleteCategory}>
                    <input type="hidden" value={category.id} name="id"></input>
                    <Button variant={'ghost'} size={'sm'}>
                      <span className="sr-only">Delete</span>
                      <MarkIcon />
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
        </PropertyTable>
      </CardContent>
      <CardFooter className="justify-end">
        <CategoryForm />
      </CardFooter>
    </Card>
  )
}

export { Colors, Sizes, Categories }

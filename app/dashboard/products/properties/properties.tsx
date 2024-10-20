import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  CategoryForm,
  ColorForm,
  DeleteCategory,
  DeleteColor,
  DeleteSize,
  SizeForm
} from './properties-forms'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { db } from '@/db'
import React from 'react'

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

const ColorTable = ({
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
          <TableHead>{title}</TableHead>
          <TableHead>Hex Code</TableHead>
          <TableHead>Color</TableHead>
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
  const colors = await db.query.color.findMany({})

  return (
    <CardWrapper
      title="Colors"
      description="Manage all product colors"
      dialog={<ColorForm />}>
      <ColorTable title="Color">
        {colors.map(({ name, id, hex_code }) => (
          <TableRow key={id}>
            <TableCell className="capitalize font-medium">{name}</TableCell>
            <TableCell className="uppercase">{hex_code}</TableCell>
            <TableCell>
              <div
                className={`h-6 w-6 rounded-full`}
                style={{
                  backgroundColor: hex_code
                }}></div>
            </TableCell>
            <TableCell>
              <DeleteColor id={id} />
            </TableCell>
          </TableRow>
        ))}
      </ColorTable>
    </CardWrapper>
  )
}

const Sizes = async () => {
  const sizes = await db.query.size.findMany({})

  return (
    <CardWrapper
      title="Sizes"
      description="Manage all product sizes"
      dialog={<SizeForm />}>
      <PropertyTable title="Sizes">
        {sizes.map(({ name, id }) => (
          <TableRow key={id}>
            <TableCell className="uppercase font-medium">{name}</TableCell>
            <TableCell>
              <DeleteSize id={id} />
            </TableCell>
          </TableRow>
        ))}
      </PropertyTable>
    </CardWrapper>
  )
}

const Categories = async () => {
  const categories = await db.query.category.findMany({})

  return (
    <CardWrapper
      title="Categories"
      description="Manage all product categories"
      dialog={<CategoryForm />}>
      <PropertyTable title="Categories">
        {categories.map(({ name, id }) => (
          <TableRow key={id}>
            <TableCell className="capitalize font-medium">{name}</TableCell>
            <TableCell>
              <DeleteCategory id={id} />
            </TableCell>
          </TableRow>
        ))}
      </PropertyTable>
    </CardWrapper>
  )
}

const CardWrapper = ({
  title,
  description,
  dialog,
  children
}: {
  title: string
  description: string
  dialog: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="justify-end">{dialog}</CardFooter>
    </Card>
  )
}

export { Colors, Sizes, Categories }

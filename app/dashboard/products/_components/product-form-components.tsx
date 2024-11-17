import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { PlusIcon } from '@/components/icons'
import { Control, useFieldArray } from 'react-hook-form'
import { FormSchema } from './product-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Category, VariantFields } from '@/db/types'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { X } from 'lucide-react'

type FormControl = Control<FormSchema>

export const ProductDetailsForm = ({ control }: { control: FormControl }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Add your product details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <FormField
            control={control}
            name="name"
            key="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter the product name..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="brand"
            key="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">brand</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="string"
                    placeholder="Enter the brand name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            key="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Provide a brief description of the product..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="price"
            key="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter the product price..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="discount"
            key="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">discount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter any discount percentage..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export const ProductVariantsForm = ({
  error,
  control,
  variantFields,
  addRemoveVariantId
}: {
  error: string
  control: FormControl
  variantFields: VariantFields
  addRemoveVariantId?: (id: number) => void
}) => {
  const { colors, size } = variantFields
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'variants'
  })
  const addVariant = () => {
    append({
      stock: 0
    } as {
      stock: number
      size: string
      color: string
    })
  }

  const removeVariant = (index: number) => {
    const variant = fields[index]

    if (!variant) return

    remove(index)

    if (variant.ownId) {
      addRemoveVariantId && addRemoveVariantId(variant.ownId)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>Manage your product stock</CardDescription>
        {error && <p className="text-red-600 font-medium text-sm">{error}</p>}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Stock</TableHead>
              <TableHead className="w-[200px]">Size</TableHead>
              <TableHead className="w-[200px]">Color</TableHead>
              <TableHead className="w-[20px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  <FormField
                    control={control}
                    name={`variants.${index}.stock`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Stock</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={control}
                    name={`variants.${index}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Size</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              id="status"
                              aria-label="Select size"
                              className="capitalize">
                              <SelectValue placeholder="Pick a size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {!!size?.length &&
                              size.map(s => (
                                <SelectItem
                                  className="uppercase"
                                  key={s.id}
                                  value={s.id + ''}>
                                  {s.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={control}
                    name={`variants.${index}.color`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Color</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className="capitalize"
                              id="status"
                              aria-label="Select color">
                              <SelectValue placeholder="Pick a color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {!!colors?.length &&
                              colors.map(color => (
                                <SelectItem
                                  className="capitalize"
                                  key={color.id}
                                  value={color.id + ''}>
                                  {color.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => removeVariant(index)}
                    variant={'ghost'}
                    size={'icon'}>
                    <X className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          type="button"
          onClick={addVariant}
          variant="ghost"
          className="gap-1">
          <PlusIcon /> Add Variant
        </Button>
      </CardFooter>
    </Card>
  )
}

export const ProductCategory = ({
  control,
  categories
}: {
  control: FormControl
  categories: Category[] | null
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Product Category</CardTitle>
      <CardDescription>Select your product category</CardDescription>
    </CardHeader>
    <CardContent>
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger
                  id="status"
                  aria-label="Select Category"
                  className="capitalize">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {!!categories?.length &&
                  categories.map(category => (
                    <SelectItem
                      className="capitalize"
                      key={category.id}
                      value={category.id + ''}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardContent>
  </Card>
)

export const ProductDepartment = ({ control }: { control: FormControl }) => (
  <Card>
    <CardHeader>
      <CardTitle>Product Department</CardTitle>
      <CardDescription>Select your product department</CardDescription>
    </CardHeader>
    <CardContent>
      <FormField
        control={control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger
                  id="status"
                  aria-label="Select Department"
                  className="capitalize">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardContent>
  </Card>
)

export const ProductImage = ({
  children,
  thumbnail
}: {
  children: React.ReactNode
  thumbnail: string
}) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle>Product Images</CardTitle>
      <CardDescription>Manage your product images</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <Image
        src={thumbnail || '/placeholder.svg'}
        width={280}
        height={280}
        alt="Product Thumbnail"
        className="object-cover rounded-lg  self-center"
      />
      {children}
    </CardContent>
  </Card>
)

export const ProductArchive = ({ control }: { control: FormControl }) => (
  <div className="grid grid-cols-2 gap-4">
    <FormField
      control={control}
      name="archived"
      render={({ field }) => (
        <FormItem className="bg-background flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Archived Product</FormLabel>
            <FormDescription>This product will not be visible</FormDescription>
          </div>
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="featured"
      render={({ field }) => (
        <FormItem className="bg-background flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Featured Product</FormLabel>
            <FormDescription>
              This product will be featured (will be shown on the home page)
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  </div>
)

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

import { Category } from '@/db/schema'
import { VariantFields } from '../new/page'
import { Checkbox } from '@/components/ui/checkbox'

type FormControl = Control<FormSchema>

const Inputs = ['name', 'brand', 'description', 'price', 'discount'] as const

export const ProductDetailsForm = ({ control }: { control: FormControl }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Add your product details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Inputs.map(input => (
            <FormField
              control={control}
              name={input}
              key={input}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{input}</FormLabel>
                  <FormControl>
                    {input === 'description' ? (
                      <Textarea
                        {...field}
                        className="min-h-32"
                        placeholder="Product description (optional)..."
                      />
                    ) : (
                      <Input
                        {...field}
                        type={
                          field.name === 'price' || field.name === 'discount'
                            ? 'number'
                            : 'string'
                        }
                        placeholder={`Product ${field.name}...`}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export const ProductVariantsForm = ({
  error,
  control,
  variantFields
}: {
  error: string
  control: FormControl
  variantFields: VariantFields
}) => {
  const { colors, size } = variantFields
  const { fields, append } = useFieldArray({
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>Manage your stock</CardDescription>
        {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Stock</TableHead>
              <TableHead className="w-[200px]">Size</TableHead>
              <TableHead className="w-[200px]">Color</TableHead>
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
                            <SelectTrigger id="status" aria-label="Select size">
                              <SelectValue placeholder="Pick a size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {size?.map((s, i) => (
                              <SelectItem key={s.id!} value={s.id + ''}>
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
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              id="status"
                              aria-label="Select color">
                              <SelectValue placeholder="Pick a color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {colors?.map((c, i) => (
                              <SelectItem key={c.id!} value={c.id + ''}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
          size="sm"
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger id="status" aria-label="Select Category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories?.map(category => (
                  <SelectItem key={category.id!} value={category.id! + ''}>
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger id="status" aria-label="Select Department">
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

export const ProductImage = ({ children }: { children: React.ReactNode }) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle>Product Images</CardTitle>
      <CardDescription>Manage your product images</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
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

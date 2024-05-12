'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Checkbox } from '@/components/ui/checkbox'

const formProductSchema = z.object({
  name: z.string().min(5),
  brand: z.string().optional(),
  description: z.string().min(10).optional(),
  price: z.coerce.number().min(1),
  discount: z.boolean().optional(),
  percentage_off: z.coerce.number().optional(),
  image: z.string(),
  color: z.string(),
  sizes: z.string(),
  department: z.enum(['Men', 'Women']),
  category: z.string()
})

const stringKeys = [
  'name',
  'brand',
  'description',
  'image',
  'color',
  'sizes',
  'category'
] as const
const numberKeys = ['price'] as const

const placeholders = {
  name: 'Product name',
  brand: 'Brand name',
  description: 'Insert description here',
  price: '0$',
  discount: '',
  percentage_off: '0%',
  image: 'Add product image url',
  color: 'Navy Blue',
  sizes: 'S',
  department: 'Men',
  category: 'Shirt'
}

export default function ProductForm() {
  const form = useForm<z.infer<typeof formProductSchema>>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: '',
      brand: '',
      description: '',
      price: 0,
      discount: false,
      percentage_off: 0,
      image: '',
      color: '',
      sizes: '',
      department: 'Men',
      category: ''
    }
  })

  function onSubmit(values: z.infer<typeof formProductSchema>) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-2">
        {stringKeys.map((item, i) => (
          <FormField
            control={form.control}
            name={item}
            key={item + i}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder={placeholders[field.name]} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {numberKeys.map((item, i) => (
          <FormField
            control={form.control}
            name={item}
            key={item + i}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder={placeholders[field.name]} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Set discount</FormLabel>
                <FormDescription>
                  This product are going to be in discount
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="percentage_off"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Discount Percentage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  placeholder={placeholders[field.name]}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Discount percentage for this product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:col-span-2 flex flex-wrap gap-2 mt-4">
          <Button variant={'outline'}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

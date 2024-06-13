import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const shippingSchema = z.object({
  street: z.string().trim().min(1, 'Street address is required'),
  apartment: z.string().trim().optional().default(''),
  city: z.string().trim().min(1, 'City is required'),
  country: z.string().trim().min(1, 'Country is required'),
  state: z.string().trim().min(1, 'State/Province is required'),
  postal_code: z.string().trim().min(1, 'Zip/Postal code is required')
})

type ShippingDetails = z.infer<typeof shippingSchema>

const Inputs = [
  'street',
  'apartment',
  'country',
  'city',
  'state',
  'postal_code'
] as const

const placeholders: ShippingDetails = {
  street: '123 Main St',
  apartment: '(Optional) Apt 4B',
  country: 'United States',
  city: 'New York',
  state: 'NY',
  postal_code: '10001'
}

export default function Shipping() {
  const form = useForm<ShippingDetails>({
    resolver: zodResolver(shippingSchema)
  })

  const handleSubmit = () => {}

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2 bg-white p-4 rounded-md border border-zinc-300">
          <h2 className="text-xl font-semibold">Shipping</h2>
          {Inputs.map(input => (
            <FormField
              name={input}
              key={input}
              control={form.control}
              render={({ field }) => (
                <FormItem key={field.name} className="space-y-1">
                  <FormLabel className="capitalize">
                    {field.name.split('_').join(' ')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={placeholders[input]} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <p className="text-zinc-700 text-sm">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our Privacy Policy.
        </p>
        <Button className="h-12 w-full">Continue Payment</Button>
      </form>
    </Form>
  )
}

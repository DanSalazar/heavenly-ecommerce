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

const personalSchema = z.object({
  email: z.string().email('Invalid email format'),
  first_name: z
    .string({
      required_error: 'First name is required'
    })
    .trim(),
  last_name: z
    .string({
      required_error: 'Last name is required'
    })
    .trim(),
  phone_number: z
    .string()
    .optional()
    .transform(value => (value ? value.replace(/\D/g, '') : value))
})

type PersonalDetails = z.infer<typeof personalSchema>

const Inputs = ['email', 'first_name', 'last_name', 'phone_number'] as const
const placeholders: PersonalDetails = {
  email: 'example@example.com',
  first_name: 'Enter your first name',
  last_name: 'Enter your last name',
  phone_number: '(Optional) Phone number'
}

export default function Personal() {
  const form = useForm<PersonalDetails>({
    resolver: zodResolver(personalSchema)
  })

  const handleSubmit = () => {}

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2 bg-white p-4 rounded-md border border-zinc-300">
          <h2 className="text-xl font-semibold">Information</h2>
          {Inputs.map((input, i) => (
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
        <Button className="h-12 w-full">Continue Shipping</Button>
      </form>
    </Form>
  )
}

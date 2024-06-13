import { Button } from '@/components/ui/button'
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

export default function Payment() {
  const form = useForm()

  const handleSubmit = () => {}

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2 bg-white p-4 rounded-md border border-zinc-300">
          <h2 className="text-xl font-semibold">Payment</h2>
          <FormItem>
            <FormLabel>Cardholder Name</FormLabel>
            <FormControl>
              <Input placeholder="Your cardholder name" />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Card Number</FormLabel>
            <FormControl>
              <Input
                className="h-10 col-span-2"
                placeholder="Your card number"
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Expiry Date</FormLabel>
            <FormControl>
              <Input placeholder="MM/YY" />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>CVC / CVV</FormLabel>
            <FormControl>
              <Input placeholder="CVC / CVV" />
            </FormControl>
          </FormItem>
        </div>
        <p className="text-zinc-700 text-sm">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our Privacy Policy.
        </p>
        <Button className="h-12 w-full">Place Order</Button>
      </form>
    </Form>
  )
}

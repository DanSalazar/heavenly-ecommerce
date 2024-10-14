'use client'

import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SpinnerStatus } from '@/components/ui/spinner'
import { updateSocialMedia } from '@/actions/social-media'
import { ShopInformation } from '@/db/types'

const formSchema = z.object({
  facebook: z.string().url().or(z.literal('')),
  x: z.string().url().or(z.literal('')),
  instagram: z.string().url().or(z.literal(''))
})

type FormValues = z.infer<typeof formSchema>

export default function SocialMediaForm({
  shopInfo
}: {
  shopInfo: ShopInformation
}) {
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: shopInfo?.facebook ?? undefined,
      x: shopInfo?.x ?? undefined,
      instagram: shopInfo?.instagram ?? undefined
    }
  })

  const onSubmit = async (data: FormValues) => {
    const result = await updateSocialMedia(data)

    if (result?.serverError || result?.validationErrors) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.'
      })

      return
    }

    if (result?.data?.error) {
      toast({
        title: 'Error',
        description: result.data.error
      })

      return
    }

    toast({
      title: 'Success',
      description: result?.data?.success
    })

    form.reset(data, { keepValues: true })
  }

  const isDisabled = !form.formState.isDirty || form.formState.isSubmitting

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Social Media Information</h2>
        <p className="text-sm text-gray-500">
          Add your social media links to help customers find you on social
          media. This will be displayed on the footer.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="facebook"
                      placeholder="https://facebook.com/yourusername..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="x"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="x"
                      placeholder="https://x.com/yourusername..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="instagram"
                      placeholder="https://instagram.com/yourusername..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-32"
              type="submit"
              aria-disabled={isDisabled}
              disabled={isDisabled}>
              {form.formState.isSubmitting ? <SpinnerStatus /> : 'Save Changes'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

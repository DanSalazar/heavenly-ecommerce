'use client'

import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProductArchive,
  ProductCategory,
  ProductDepartment,
  ProductDetailsForm,
  ProductImage,
  ProductVariantsForm
} from './product-form-components'
import Uploader from './multi-uploader'
import { useState } from 'react'
import { ImageInsert, ProductInsert, ProductVariantsInsert } from '@/db/schema'
import { createProduct } from '@/server/actions'
import { VariantFields } from '../new/page'
import { deleteFiles } from '@/server/uploadthing'
import { PreventNavigation } from './prevent-navigation'

export const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(1),
  brand: z
    .string({
      required_error: 'Brand is required'
    })
    .min(1),
  description: z.string().optional(),
  price: z.coerce
    .number({
      required_error: 'Price is required'
    })
    .min(1, {
      message: 'Price must be greater than or equal to 1'
    }),
  discount: z.coerce.number().max(99).optional(),
  variants: z
    .array(
      z.object({
        stock: z.coerce.number().max(99),
        color: z.string({ required_error: 'Color is required' }),
        size: z.string({ required_error: 'Size is required' }),
        id: z.number().optional()
      })
    )
    .min(1, {
      message: 'You must add at least one variant'
    }),
  category: z.string({ required_error: 'Category is required' }),
  department: z.enum(['men', 'women'], {
    required_error: 'Department is required'
  }),
  archived: z.boolean(),
  featured: z.boolean()
})

export type FormSchema = z.infer<typeof formSchema>

export function ProductForm({
  variantFields
}: {
  variantFields: VariantFields
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      brand: '',
      description: '',
      price: 0,
      featured: false,
      archived: false,
      discount: 0
    }
  })
  const [progress, setProgress] = useState('')
  const [generalError, setGeneralError] = useState('')
  const [myFiles, setFiles] = useState<{ key: string; url: string }[]>([])

  const addFiles = (files: { key: string; url: string }[]) => {
    setFiles(cFiles => [...cFiles, ...files])
  }

  const handleSubmit = async (values: FormSchema) => {
    setGeneralError('')

    if (myFiles.length < 1) {
      setGeneralError('You need at least add one image.')
      return
    }

    setProgress('Saving product...')
    const product_id = crypto.randomUUID()

    const product: ProductInsert = {
      id: product_id,
      name: values.name,
      brand: values.brand,
      description: values.description || '',
      price: values.price,
      thumbnail: myFiles?.length ? myFiles[0].url : '',
      department: values.department,
      discount: Boolean(values.discount),
      percentage_off: values.discount || 0,
      status: values.archived ? 'archived' : 'active',
      created_at: new Date().toISOString(),
      featured: values.featured
    }
    const variants: ProductVariantsInsert[] = values.variants.map(variant => ({
      color_id: Number(variant.color),
      size_id: Number(variant.size),
      category_id: Number(values.category),
      stock: variant.stock,
      product_id: product_id
    }))
    const images: ImageInsert[] = myFiles.map(file => ({
      ...file,
      product_id: product_id
    }))

    const err = await createProduct(product, variants, images)

    if (err) {
      setProgress('')
      setGeneralError(err)
    }
  }

  const resetData = async () => {
    if (myFiles.length) {
      await deleteFiles(myFiles.map(({ key }) => key))
    }
  }

  const isDirty = form.formState.isDirty || myFiles.length > 0

  return (
    <>
      <PreventNavigation
        isDirty={isDirty}
        backHref="/dashboard/products"
        resetData={resetData}
      />
      <Form {...form}>
        <form
          className="grid flex-1 auto-rows-max gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="flex-1 text-3xl font-semibold tracking-tight">
              Create a new product
            </h1>
            <div className="hidden md:block md:ml-auto space-x-2">
              <Link
                href={'/dashboard/products'}
                className={buttonVariants({ variant: 'outline' })}>
                Cancel
              </Link>
              <Button type="submit" disabled={!!progress}>
                {progress ? progress : 'Create Product'}
              </Button>
              {generalError && (
                <p className="text-red-500 text-sm font-medium">
                  {generalError}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductDetailsForm control={form.control} />
              <ProductVariantsForm
                error={form.formState.errors.variants?.message || ''}
                control={form.control}
                variantFields={variantFields}
              />
              <ProductArchive control={form.control} />
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <ProductCategory
                categories={variantFields.categories}
                control={form.control}
              />
              <ProductDepartment control={form.control} />
              <ProductImage>
                <Uploader myFiles={myFiles} addFiles={addFiles} />
              </ProductImage>
            </div>
          </div>
          <div className="space-x-2 mx-auto md:hidden">
            <Link
              href={'/dashboard/products'}
              className={buttonVariants({ variant: 'outline' })}>
              Cancel
            </Link>
            <Button type="submit" disabled={!!progress}>
              {progress ? progress : 'Create Product'}
            </Button>
            {generalError && (
              <p className="text-red-500 text-sm font-medium">{generalError}</p>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

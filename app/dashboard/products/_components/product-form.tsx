'use client'

import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
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

import { MultiUploader } from './multi-uploader'
import { useRef, useState } from 'react'
import { useUploadThing } from '@/lib/uploadthing'
import { Product, ProductVariants } from '@/db/schema'
import { createProduct } from '@/server/actions'
import { VariantFields } from '../new/page'

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
  variants: z
    .array(
      z.object({
        stock: z.coerce.number().max(99),
        color: z.string({ required_error: 'Color is required' }),
        size: z.string({ required_error: 'Size is required' })
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
      archived: false
    }
  })
  const [progress, setProgress] = useState('')
  const [generalError, setGeneralError] = useState('')

  const [files, setFiles] = useState<File[]>([])
  const [filesError, setFilesError] = useState('')
  const uploadInputRef = useRef<HTMLButtonElement | null>(null)

  const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
    onUploadError: e => {
      setFilesError(e.message)
      uploadInputRef.current?.focus()
    },
    onUploadProgress: p => setProgress(`Uploading images ${p}%`)
  })

  const addFiles = (files: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...files])
  }

  const handleSubmit = async (values: FormSchema) => {
    setGeneralError('')
    let urls: string[] | undefined

    if (files.length) {
      const data = await startUpload(files)
      urls = data?.map(f => f.url)
    } else {
      setFilesError('You need to upload at least 1 image')
      uploadInputRef.current?.focus()
      return
    }

    setProgress('Saving product...')

    const product_id = crypto.randomUUID()

    const product: Product = {
      id: product_id,
      name: values.name,
      brand: values.brand,
      description: values.description as string,
      price: values.price,
      image: urls?.length ? urls[0] : '',
      department: values.department,
      discount: false,
      percentage_off: 0,
      status: values.archived ? 'archived' : 'active',
      created_at: new Date().toISOString(),
      featured: values.featured
    }

    const variants: ProductVariants[] = values.variants.map(variant => ({
      color_id: Number(variant.color),
      size_id: Number(variant.size),
      category_id: Number(values.category),
      stock: variant.stock,
      product_type_Id: 1,
      product_id: product_id
    }))

    const err = await createProduct(product, variants)

    if (err) {
      setProgress('')
      setGeneralError(err)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col sm:gap-4">
        <main className="grid flex-1 items-start gap-4">
          <Form {...form}>
            <form
              className="mx-auto grid flex-1 auto-rows-max gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={'/dashboard/products'}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'icon'
                  })}>
                  <ArrowLeftIcon />
                  <span className="sr-only">Back</span>
                </Link>
                <h1 className="flex-1 text-xl font-semibold tracking-tight">
                  Create a new product
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button type="button" variant="outline" disabled={!!progress}>
                    Discard
                  </Button>
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
                    <MultiUploader
                      ref={uploadInputRef}
                      files={files}
                      addFiles={addFiles}
                      permittedFileInfo={permittedFileInfo}
                      error={filesError}
                    />
                  </ProductImage>
                </div>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-2 md:hidden">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!!progress}>
                  Discard
                </Button>
                <Button type="submit" size="sm" disabled={!!progress}>
                  {progress ? progress : 'Create Product'}
                </Button>
              </div>
            </form>
          </Form>
        </main>
      </div>
    </div>
  )
}

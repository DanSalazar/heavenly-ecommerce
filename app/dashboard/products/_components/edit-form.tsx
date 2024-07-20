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
  ProductVariantsForm
} from './product-form-components'

// import { MultiUploader } from './multi-uploader'
import { useState } from 'react'
// import { useUploadThing } from '@/lib/uploadthing'
import { Product, ProductVariants, ProductVariantWithJoins } from '@/db/schema'
import { updateProduct } from '@/server/actions'
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

const keysFromSchema = formSchema.keyof().options
type Keys = (typeof keysFromSchema)[number]

export function EditProductForm({
  variantFields,
  product,
  variants
}: {
  variantFields: VariantFields
  product: Product
  variants: ProductVariantWithJoins[]
}) {
  const variantsToArray = variants.map(({ id, color, size, stock }) => ({
    id,
    color: color?.id! + '',
    size: size?.id! + '',
    stock: stock!
  }))
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      brand: product.brand!,
      description: product.description!,
      price: product.price,
      featured: product.featured,
      archived: product.status === 'archived',
      department: product.department,
      variants: variantsToArray,
      category: variants[0].category?.id! + ''
    }
  })
  const [progress, setProgress] = useState('')
  const [generalError, setGeneralError] = useState('')
  // const [files, setFiles] = useState<(File | string)[]>([product.image!])
  // const [filesError, setFilesError] = useState('')
  // const uploadInputRef = useRef<HTMLButtonElement | null>(null)

  // const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
  //   onUploadError: e => {
  //     setFilesError(e.message)
  //     uploadInputRef.current?.focus()
  //   },
  //   onUploadProgress: p => setProgress(`Uploading images ${p}%`)
  // })

  // const addFiles = (files: File[]) => {
  //   setFiles(prevFiles => [...prevFiles, ...files])
  // }

  const handleSubmit = async (values: FormSchema) => {
    setGeneralError('')

    const dirtyKeys = Object.keys(form.formState.dirtyFields) as Keys[]
    const dirtyData = dirtyKeys.reduce((acc, key) => {
      if (key === 'variants') return acc
      return { ...acc, [key]: values[key] }
    }, {})

    setProgress('Saving product...')
    const productUpdated: Partial<Product> | null =
      Object.keys(dirtyData).length < 1
        ? null
        : {
            ...dirtyData
          }

    let variants: Partial<ProductVariants>[] | null = null

    if (form.formState.dirtyFields.variants) {
      variants = values.variants.map(variant => {
        const v: Partial<ProductVariants> = {
          color_id: Number(variant.color),
          size_id: Number(variant.size),
          category_id: Number(values.category),
          stock: variant.stock,
          product_id: product.id,
          product_type_Id: 0
        }

        // Product variant edited
        if (variant.id) v.id = variant.id

        return v
      })
    }

    const err = await updateProduct(product.id, productUpdated, variants)

    if (err) {
      setProgress('')
      setGeneralError(err)
    }
  }
  const isProductUpdated = form.formState.isDirty /* || files.length > 1 */

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
                  Edit a product
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button type="button" variant="outline" disabled={!!progress}>
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    disabled={!!progress || !isProductUpdated}>
                    {progress ? progress : 'Save changes'}
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
                  {/* <ProductImage>
                    <MultiUploader
                      ref={uploadInputRef}
                      files={files}
                      addFiles={addFiles}
                      permittedFileInfo={permittedFileInfo}
                      error={filesError}
                    />
                  </ProductImage> */}
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
                <Button
                  type="submit"
                  size="sm"
                  disabled={!!progress || !isProductUpdated}>
                  {progress ? progress : 'Save changes'}
                </Button>
              </div>
            </form>
          </Form>
        </main>
      </div>
    </div>
  )
}

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
import { useState } from 'react'
import {
  ImageInsert,
  ImageInsertNoProductId,
  ProductVariantsInsert,
  VariantFields
} from '@/db/types'
import { createProduct } from '@/actions/product'
import { ProductSchema } from '@/actions/product-schema'
import { useToast } from '@/components/ui/use-toast'
import { ImagesState } from '@/components/uploader/types'
import { deleteFilesAction } from '@/actions/files'
import dynamic from 'next/dynamic'
import ImagesDialog from './images-dialog'
import { ArrowLeftIcon } from 'lucide-react'

const PreventNavigation = dynamic(() => import('./prevent-navigation'), {
  ssr: false
})

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
    .min(1)
    .max(50),
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
        ownId: z.number().optional(),
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
  const { toast } = useToast()
  const [images, setImages] = useState<ImagesState>({
    pendingImages: [],
    uploadedImages: []
  })
  const [thumbnail, setThumbnail] = useState('')

  const isSubmitting = form.formState.isSubmitting

  const addImages = (files: ImageInsertNoProductId[], uploaded: boolean) => {
    if (uploaded) {
      const fileNames = files.map(file => file.name)
      setImages(currentImages => ({
        pendingImages: currentImages.pendingImages.filter(image => {
          return !fileNames.includes(image.name)
        }),
        uploadedImages: [...currentImages.uploadedImages, ...files]
      }))
    } else {
      setImages(currentImages => ({
        ...images,
        pendingImages: [...currentImages.pendingImages, ...files]
      }))
    }
  }

  const cancelPendingImages = () => {
    setImages({
      ...images,
      pendingImages: []
    })
  }

  const deleteFile = async (key: string, src?: string) => {
    setImages(currentImages => ({
      ...currentImages,
      uploadedImages: currentImages.uploadedImages.filter(
        ({ key: uploadKey }) => uploadKey !== key
      ),
      productImages: currentImages.productImages?.filter(
        ({ key: uploadKey }) => uploadKey !== key
      )
    }))

    if (src === thumbnail) {
      setThumbnail('')
    }
  }

  const addThumbnail = (src: string) => {
    setThumbnail(src)
  }

  const handleSubmit = async (values: FormSchema) => {
    if (!thumbnail) {
      toast({
        title: 'Error',
        description: 'You need to add a thumbnail 📷.',
        variant: 'destructive'
      })
      return
    }

    if (images.uploadedImages.length < 1) {
      toast({
        title: 'Error',
        description: 'You need to add at least one image 📷.',
        variant: 'destructive'
      })
      return
    }

    const product_id = crypto.randomUUID()

    const product: ProductSchema = {
      id: product_id,
      name: values.name,
      brand: values.brand,
      description: values.description || '',
      price: values.price,
      department: values.department,
      discount: Boolean(values.discount),
      percentage_off: values.discount || 0,
      status: values.archived ? 'archived' : 'active',
      created_at: new Date().toISOString(),
      featured: values.featured,
      category_id: Number(values.category),
      thumbnail
    }

    const variants: ProductVariantsInsert[] = values.variants.map(variant => ({
      color_id: Number(variant.color),
      size_id: Number(variant.size),
      stock: variant.stock,
      product_id: product_id
    }))

    const imageInserts: ImageInsert[] = images.uploadedImages.map(file => ({
      ...file,
      product_id: product_id
    }))

    const result = await createProduct({
      product,
      variants,
      images: imageInserts
    })

    if (
      result?.serverError ||
      result?.validationErrors ||
      result?.data?.error
    ) {
      toast({
        title: 'Error',
        description:
          result?.serverError ||
          result?.data?.error ||
          'An error occurred while saving the product. Please check your inputs and try again.',
        variant: 'destructive'
      })
    }
  }

  const resetData = async () => {
    if (images.uploadedImages.length) {
      await deleteFilesAction(images.uploadedImages.map(({ key }) => key))
    }
  }

  const isDirty = form.formState.isDirty || images.uploadedImages.length > 0

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
            <Link
              href={'/dashboard/products'}
              className={buttonVariants({
                variant: 'outline',
                size: 'icon'
              })}>
              <ArrowLeftIcon width={18} height={18} />
              <span className="sr-only">Back</span>
            </Link>
            <h1 className="flex-1 text-2xl font-semibold tracking-tight">
              Create a new product
            </h1>
            <div className="hidden md:block md:ml-auto space-x-2">
              <Link
                href={'/dashboard/products'}
                className={buttonVariants({ variant: 'outline' })}>
                Cancel
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Create Product'}
              </Button>
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
              <ProductImage thumbnail={thumbnail}>
                <ImagesDialog
                  deleteFile={deleteFile}
                  thumbnail={thumbnail}
                  setThumbnail={addThumbnail}
                  images={images}
                  addImages={addImages}
                  cancelPendingImages={cancelPendingImages}
                />
              </ProductImage>
            </div>
          </div>
          <div className="space-x-2 mx-auto md:hidden">
            <Link
              href={'/dashboard/products'}
              className={buttonVariants({ variant: 'outline' })}>
              Cancel
            </Link>
            <Button type="submit" disabled={!!isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button, buttonVariants } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  ProductArchive,
  ProductCategory,
  ProductDepartment,
  ProductDetailsForm,
  ProductImage,
  ProductVariantsForm
} from './product-form-components'

import {
  ImageInsert,
  ImageInsertNoProductId,
  ImageSelect,
  Product,
  ProductVariantsInsert,
  ProductVariantWithJoins
} from '@/db/schema'
// import { updateProduct } from '@/server/actions'
import { VariantFields } from '../new/page'
import { deleteFiles } from '@/server/uploadthing'
import Link from 'next/link'
import { PreventNavigation } from './prevent-navigation'
import { FormSchema, formSchema } from './product-form'
import { updateProduct } from '@/actions/product'
import { UpdateProductType } from '@/actions/product-schema'
import { useToast } from '@/components/ui/use-toast'
import { ImagesState } from '@/components/uploader/types'
import Uploader from '@/components/uploader'

const keysFromSchema = formSchema.keyof().options
type Keys = (typeof keysFromSchema)[number]

export function EditProductForm({
  variantFields,
  product,
  variants,
  images
}: {
  variantFields: VariantFields
  product: Product
  variants: ProductVariantWithJoins[]
  images: ImageSelect[]
}) {
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
      variants: variants.map(({ id, color, size, stock }) => ({
        id,
        color: color?.id! + '',
        size: size?.id! + '',
        stock: stock!
      })),
      category: product.category_id + ''
    }
  })

  const { toast } = useToast()
  const [progress, setProgress] = useState('')
  const [generalError, setGeneralError] = useState('')
  const [newImages, setImages] = useState<ImagesState>({
    pendingImages: [],
    uploadedImages: [],
    productImages: images
  })

  const addImages = (files: ImageInsertNoProductId[], uploaded: boolean) => {
    if (uploaded) {
      const fileNames = files.map(file => file.name)
      setImages(currentImages => ({
        ...currentImages,
        pendingImages: currentImages.pendingImages.filter(image => {
          return !fileNames.includes(image.name)
        }),
        uploadedImages: [...currentImages.uploadedImages, ...files]
      }))
    } else {
      setImages(currentImages => ({
        ...currentImages,
        pendingImages: [...currentImages.pendingImages, ...files]
      }))
    }
  }

  const cancelPendingImages = () => {
    setImages({
      ...newImages,
      pendingImages: []
    })
  }

  const handleSubmit = async (values: FormSchema) => {
    setGeneralError('')

    const dirtyKeys = Object.keys(form.formState.dirtyFields) as Keys[]
    const dirtyData = dirtyKeys.reduce((acc, key) => {
      if (key === 'variants') return acc
      return { ...acc, [key]: values[key] }
    }, {})

    setProgress('Saving product...')

    const productUpdated: UpdateProductType | null =
      Object.keys(dirtyData).length < 1
        ? null
        : {
            ...dirtyData
          }

    let variants: ProductVariantsInsert[] | null = null

    if (form.formState.dirtyFields.variants) {
      variants = values.variants.map(variant => {
        const v: ProductVariantsInsert = {
          color_id: Number(variant.color),
          size_id: Number(variant.size),
          stock: variant.stock,
          product_id: product.id
        }

        // Add the variant id if it exists, indicating an update to an existing variant
        if (variant.id) v.id = variant.id

        return v
      })
    }

    const newImagesData: ImageInsert[] = newImages.uploadedImages.map(file => ({
      ...file,
      product_id: product.id
    }))

    const result = await updateProduct({
      product_id: product.id,
      product: productUpdated,
      images: newImagesData,
      variants
    })

    setProgress('')

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
          'An unexpected error occurred while saving the product. Please try again.',
        variant: 'destructive'
      })
    }
  }

  const resetData = async () => {
    if (newImages.uploadedImages.length) {
      await deleteFiles(newImages.uploadedImages.map(({ key }) => key))
    }
  }

  const isDirty =
    Object.keys(form.formState.dirtyFields).length > 0 ||
    newImages.uploadedImages.length > 0

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
            <h1 className="flex-1 text-xl font-semibold tracking-tight">
              Edit a product
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Link
                href={'/dashboard/products'}
                className={buttonVariants({ variant: 'outline' })}>
                Cancel
              </Link>
              <Button type="submit" disabled={!!progress || !isDirty}>
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
              <ProductImage>
                <Uploader
                  cancelPendingImages={cancelPendingImages}
                  addImages={addImages}
                  images={newImages}
                />
              </ProductImage>
            </div>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-2 md:hidden">
            <Link
              href={'/dashboard/products'}
              className={buttonVariants({ variant: 'outline' })}>
              Cancel
            </Link>
            <Button type="submit" disabled={!!progress || !isDirty}>
              {progress ? progress : 'Save changes'}
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

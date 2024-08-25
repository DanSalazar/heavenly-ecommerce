'use client'

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

import { useState } from 'react'
import {
  ImageInsert,
  ImageSelect,
  Product,
  ProductVariants,
  ProductVariantWithJoins
} from '@/db/schema'
import { updateProduct } from '@/server/actions'
import { VariantFields } from '../new/page'
import Uploader from './multi-uploader'
import { deleteFiles } from '@/server/uploadthing'
import Link from 'next/link'
import { PreventNavigation } from './prevent-navigation'
import { FormSchema, formSchema } from './product-form'

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
      category: product.category_id + ''
    }
  })
  const [progress, setProgress] = useState('')
  const [generalError, setGeneralError] = useState('')
  const [myNewFiles, setMyNewFiles] = useState<
    Omit<ImageSelect, 'id' | 'product_id'>[]
  >([])

  const addFiles = (files: Omit<ImageSelect, 'id' | 'product_id'>[]) => {
    setMyNewFiles(cFiles => [...cFiles, ...files])
  }

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
          stock: variant.stock,
          product_id: product.id
        }

        // Product variant edited
        if (variant.id) v.id = variant.id

        return v
      })
    }

    const newImages: ImageInsert[] = myNewFiles.map(file => ({
      ...file,
      product_id: product.id
    }))
    const err = await updateProduct(
      product.id,
      productUpdated,
      variants,
      newImages
    )

    if (err) {
      setProgress('')
      setGeneralError(err)
    }
  }

  const resetData = async () => {
    if (myNewFiles.length) {
      await deleteFiles(myNewFiles.map(({ key }) => key))
    }
  }

  const isDirty = form.formState.isDirty || myNewFiles.length > 0

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
                  uploadedFiles={images}
                  myFiles={myNewFiles}
                  addFiles={addFiles}
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

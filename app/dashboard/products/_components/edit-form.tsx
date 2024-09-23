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
import { VariantFields } from '../new/page'
import Link from 'next/link'
import { PreventNavigation } from './prevent-navigation'
import { FormSchema, formSchema } from './product-form'
import { deleteProductVariant, updateProduct } from '@/actions/product'
import { UpdateProductType } from '@/actions/product-schema'
import { useToast } from '@/components/ui/use-toast'
import { ImagesState } from '@/components/uploader/types'
import Uploader from '@/components/uploader'
import { deleteFilesAction } from '@/actions/files'

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
        ownId: id,
        color: color?.id! + '',
        size: size?.id! + '',
        stock: stock!,
        id
      })),
      category: product.category_id + ''
    }
  })

  const { toast } = useToast()
  const [thumbnail, setThumbnail] = useState(product.thumbnail)
  const [newImages, setImages] = useState<ImagesState>({
    pendingImages: [],
    uploadedImages: [],
    productImages: images
  })

  const [removeVariantsId, setRemoveVariantsId] = useState<number[]>([])

  const addRemoveVariantId = (id: number) => {
    setRemoveVariantsId([...removeVariantsId, id])
  }

  const isSubmitting = form.formState.isSubmitting

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

  const addThumbnail = (thumbnailSrc: string) => {
    setThumbnail(thumbnailSrc)
  }

  const cancelPendingImages = () => {
    setImages({
      ...newImages,
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

    const result = await deleteFilesAction(key)

    if (
      result?.serverError ||
      result?.validationErrors ||
      result?.data?.error
    ) {
      toast({
        title: 'Deleting file error',
        description: result?.serverError || result?.data?.error || 'Error',
        variant: 'destructive'
      })
    }
  }

  const handleSubmit = async (values: FormSchema) => {
    if (!thumbnail) {
      toast({
        title: 'Submit Error',
        description: 'You need to add the thumbnail 📷.',
        variant: 'destructive'
      })
      return
    }

    if (
      newImages.uploadedImages.length < 1 &&
      (newImages.productImages?.length || 0) < 1
    ) {
      toast({
        title: 'Submit Error',
        description: 'You need to add at least 1 image 📷.',
        variant: 'destructive'
      })
      return
    }

    const dirtyKeys = Object.keys(form.formState.dirtyFields) as Keys[]
    const dirtyData = dirtyKeys.reduce((acc, key) => {
      if (key === 'variants') return acc
      return { ...acc, [key]: values[key] }
    }, {})

    let productUpdated: UpdateProductType | null =
      Object.keys(dirtyData).length < 1
        ? null
        : {
            ...dirtyData
          }

    if (!!thumbnail) {
      if (!productUpdated) productUpdated = { thumbnail }
      else productUpdated.thumbnail = thumbnail
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

    if (removeVariantsId.length) {
      const result = await deleteProductVariant(removeVariantsId)

      if (
        result?.serverError ||
        result?.validationErrors ||
        result?.data?.error
      ) {
        toast({
          title: 'Error',
          description:
            'An unexpected error occurred while saving the product. Please try again.',
          variant: 'destructive'
        })

        return
      }
    }

    const result = await updateProduct({
      product_id: product.id,
      product: productUpdated,
      images: newImagesData,
      variants
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
          'An unexpected error occurred while saving the product. Please try again.',
        variant: 'destructive'
      })
    }
  }

  const resetData = async () => {
    if (newImages.uploadedImages.length) {
      await deleteFilesAction(newImages.uploadedImages.map(({ key }) => key))
    }
  }

  const isDirty =
    Object.keys(form.formState.dirtyFields).length > 0 ||
    newImages.uploadedImages.length > 0 ||
    thumbnail !== product.thumbnail

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
              <Button type="submit" disabled={isSubmitting || !isDirty}>
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductDetailsForm control={form.control} />
              <ProductVariantsForm
                addRemoveVariantId={addRemoveVariantId}
                error={
                  form.formState.errors.variants?.message ||
                  form.formState.errors.variants?.root?.message ||
                  ''
                }
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
                <Uploader
                  deleteFile={deleteFile}
                  thumbnail={thumbnail}
                  setThumbnail={addThumbnail}
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
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

import { Skeleton } from './ui/skeleton'

export const ProductsWrapperSkeleton = () => (
  <div className="grid lg:grid-cols-products gap-4 border-t py-4 border-zinc-200">
    {Array(4)
      .fill(null)
      .map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-4 w-32 rounded-xl" />
          <Skeleton className="h-4 w-full rounded-xl" />
          <Skeleton className="h-4 w-24 rounded-xl" />
        </div>
      ))}
  </div>
)

export const ProductFiltersSkeleton = () => (
  <div className="flex justify-between mb-4">
    <Skeleton className="h-10 w-24" />
    <Skeleton className="h-10 w-[150px]" />
  </div>
)

export const ProductPageSkeleton = () => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-[500px] col-span-2" />
      <Skeleton className="h-[250px]" />
      <Skeleton className="h-[250px]" />
    </div>
    {/* Product Details */}
    <div className="">
      <Skeleton className="h-8 w-3/4 mb-4" /> {/* Title */}
      <Skeleton className="h-6 w-24 mb-4" /> {/* Price */}
      <Skeleton className="h-4 w-full mb-2" /> {/* Description */}
      <Skeleton className="h-4 w-5/6 mb-6" />
      {/* Color */}
      <Skeleton className="h-5 w-16 mb-2" />
      <Skeleton className="h-8 w-20 mb-4" />
      {/* Size */}
      <Skeleton className="h-5 w-16 mb-2" />
      <Skeleton className="h-8 w-20 mb-6" />
      {/* Add to Bag Button */}
      {/* Wishlist Button */}
      <div className="flex h-12 flex-wrap gap-2">
        <Skeleton className="h-full flex-1" />
        <Skeleton className="h-full w-16" />
      </div>
      {/* Payment & Delivery */}
      <Skeleton className="h-6 w-48 mt-6" />
    </div>
  </>
)

import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return <ProductPageSkeleton />
}

const ProductPageSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Skeleton className="h-[500px] w-full" />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
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
      </div>
    </div>
  )
}

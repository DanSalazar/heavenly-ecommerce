import Price from '../ecommerce/price'

export function OrderSummary({
  title,
  price
}: {
  title: string
  price: number
}) {
  return (
    <div className="flex justify-between flex-wrap">
      <p className="font-medium capitalize">{title}</p>
      <Price price={price} />
    </div>
  )
}

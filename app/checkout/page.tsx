import Summary from './_components/summary'
import MultiForm from './_components/multi-form'

export default function Page() {
  return (
    <div
      className="bg-zinc-50 p-4 lg:px-20 w-full lg:grid lg:min-h-screen space-y-4"
      style={{ gridTemplateColumns: '1fr 550px' }}>
      <div className="lg:p-12 lg:pr-8 space-y-6">
        <h2 className="text-5xl font-medium break-words">Checkout</h2>
        <MultiForm />
      </div>
      <Summary />
    </div>
  )
}

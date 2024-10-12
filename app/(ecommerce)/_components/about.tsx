import {
  CircleDollarSignIcon,
  ShieldCheck,
  Sparkles,
  Truck
} from 'lucide-react'

export default function About() {
  return (
    <div className="py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            We provide best
            <br />
            customer experiences
          </h2>
        </div>
        <div className="flex items-center">
          <div className="w-[2px] h-12 bg-primary/60 mr-4"></div>
          <p className="text text-gray-500 max-w-md text-center md:text-left">
            We ensure our customers have the best shopping experience
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        <ExperienceCard
          icon={<CircleDollarSignIcon className="w-6 h-6" strokeWidth={1.5} />}
          title="Original Products"
          description="We provide money back guarantee if the product are not original"
        />
        <ExperienceCard
          icon={<ShieldCheck className="w-6 h-6" strokeWidth={1.5} />}
          title="Satisfaction Guarantee"
          description="Exchange the product you've purchased if it doesn't fit on you"
        />
        <ExperienceCard
          icon={<Sparkles className="w-6 h-6" strokeWidth={1.5} />}
          title="New Arrival Everyday"
          description="We updates our collections almost everyday"
        />
        <ExperienceCard
          icon={<Truck className="w-6 h-6" strokeWidth={1.5} />}
          title="Fast & Free Shipping"
          description="We offer fast and free shipping for our loyal customers"
        />
      </div>
    </div>
  )
}

interface ExperienceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ExperienceCard({ icon, title, description }: ExperienceCardProps) {
  return (
    <div className="max-w-xs w-full">
      <div className="bg-secondary p-5 rounded-md inline-block mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-foreground">{description}</p>
    </div>
  )
}

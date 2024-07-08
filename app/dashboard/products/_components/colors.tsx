import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getColors } from '@/server/actions'
import { ColorForm } from './color-form'

export default async function Colors() {
  const colors = await getColors()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">All Colors</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {colors.length &&
          colors.map(color => (
            <div key={color.id} className="flex items-center gap-4">
              <p className="capitalize font-medium text-muted-foreground">
                {color.name}
              </p>
            </div>
          ))}
      </CardContent>
      <CardFooter className="justify-end">
        <ColorForm />
      </CardFooter>
    </Card>
  )
}

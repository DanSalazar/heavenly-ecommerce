import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export default function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'}>Size Guide</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
          <DialogDescription>
            Find the perfect fit with our size guide. Use the measurements below
            to determine your ideal size for a comfortable and flattering fit.
          </DialogDescription>
        </DialogHeader>

        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Chest (inches)</TableHead>
              <TableHead>Waist (inches)</TableHead>
              <TableHead>Hips (inches)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>S</TableCell>
              <TableCell>34-36</TableCell>
              <TableCell>28-30</TableCell>
              <TableCell>34-36</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>M</TableCell>
              <TableCell>38-40</TableCell>
              <TableCell>32-34</TableCell>
              <TableCell>38-40</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>L</TableCell>
              <TableCell>42-44</TableCell>
              <TableCell>36-38</TableCell>
              <TableCell>42-44</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>XL</TableCell>
              <TableCell>46-48</TableCell>
              <TableCell>40-42</TableCell>
              <TableCell>46-48</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

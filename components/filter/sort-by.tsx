import { useState } from "react"
import { Filter, FilterChildren } from "."
import { PlusIcon } from "../icons"
import { Button } from "../ui/button"

export default function SortBy() {
	const [open, setOpen] = useState(false)  

	const handleOpen = () => setOpen(!open)

	return (
		<div className="absolute right-0" >
			<Button onClick={handleOpen} variant={'custom'}>
        Sort By <PlusIcon className="ml-1" />
      </Button>
      <Filter onClose={handleOpen} className="w-[250px] absolute top-12 right-0" open={open}>
      	<FilterChildren title="Price">
      		Low to High
      	</FilterChildren>
      </Filter>
		</div>
	)
}
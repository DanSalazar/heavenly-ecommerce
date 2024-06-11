import { useState } from "react";
import { HeartIcon, HeartIconSolid } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isInFavorites, saveItemInLocal } from "@/utils";

export default function LikeButton({ id }: { id: string }) {
  const [like, setLike] = useState(false)
  const isLiked = isInFavorites(id)

  const handleLike = () => {
    if (!isLiked && !like) {
      setLike(true)
      saveItemInLocal(id)
    }
  }

  return (
    <Button onClick={handleLike} className={cn("h-full", {
      "text-rose-500 hover:text-rose-600": isLiked || like
    })} type="button" variant={'outline'}>
      {(isLiked || like)
      ? (<HeartIconSolid className={cn({ "animate-heart": like })} width={20} height={20} />)
      : (<HeartIcon width={20} height={20} />)}
    </Button>
  )
}

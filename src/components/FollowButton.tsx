import { BookmarkPlus, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "./ui/button"

interface FollowButtonProps {
  isAdded: boolean
}

const FollowButton = ({ isAdded }: FollowButtonProps) => {
  const [isOptimisticallyAdded, setIsOptimisticallyAdded] =
    useState<boolean>(isAdded)
  return (
    <form
      action={(formData: FormData) => {
        setIsOptimisticallyAdded((prev) => !prev)
      }}
    >
      <Button
        size={"icon"}
        variant={isOptimisticallyAdded ? "secondary" : "default"}
        onClick={() => toast("follow!")}
      >
        {isOptimisticallyAdded ? (
          <>
            <Check size={18} />
          </>
        ) : (
          <>
            <BookmarkPlus size={18} />
          </>
        )}
      </Button>
    </form>
  )
}

export default FollowButton

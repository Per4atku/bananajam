import { cn } from "@/lib/utils"
import { BookmarkPlus, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "./ui/button"

interface FollowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isAdded: boolean
}

const FollowButton = ({ isAdded, className, ...props }: FollowButtonProps) => {
  const [isOptimisticallyAdded, setIsOptimisticallyAdded] =
    useState<boolean>(isAdded)
  return (
    <form
      action={(formData: FormData) => {
        setIsOptimisticallyAdded((prev) => !prev)
      }}
    >
      <Button
        className={cn(className, "")}
        size={"icon"}
        variant={isOptimisticallyAdded ? "secondary" : "default"}
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

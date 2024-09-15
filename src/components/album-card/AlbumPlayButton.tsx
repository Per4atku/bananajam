import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"
import { Play } from "lucide-react"
import { extendTailwindMerge } from "tailwind-merge"

import { Button, buttonVariants } from "../ui/button"

interface AlbumPlayButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const AlbumPlayButton = ({ className, ...props }: AlbumPlayButtonProps) => {
  return (
    <Button className={cn("rounded-full", className)} size={"icon"} {...props}>
      <Play fill="" size={18} radius={200} />
    </Button>
  )
}

export default AlbumPlayButton

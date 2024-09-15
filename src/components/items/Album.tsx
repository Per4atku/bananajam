"use client"

import { cn, getInitials } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import { toast } from "sonner"

import FollowButton from "../FollowButton"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  imageURL: string
  name: string
  isAdded: boolean
  artistName: string
  artistId: string
}

const Album = ({
  id,
  imageURL,
  name,
  isAdded,
  artistName,
  className,
  artistId,

  ...props
}: AlbumProps) => {
  return (
    <>
      <div
        className={cn(
          "flex w-full rounded-md duration-200 items-center hover:bg-accent/30",
          className,
        )}
        {...props}
      >
        <Link
          href={`/artist/${artistId}?album=${id}`}
          onClick={() => toast(name)}
          className="flex items-center w-full py-2  overflow-hidden"
        >
          <Avatar className="h-12 w-12 rounded-sm">
            <AvatarImage src={imageURL} alt={name} />
            <AvatarFallback className="rounded-sm">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3 overflow-hidden">
            <h3
              className="text-xl font-medium whitespace-nowrap 
                        overflow-hidden overflow-ellipsis text-left sm:text-2xl
                        
          "
            >
              {name}
            </h3>
            <p className="text-left text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap  text-xs sm:text-sm ">
              {artistName}
            </p>
          </div>
        </Link>
        <FollowButton isAdded={isAdded} />
      </div>
    </>
  )
}

export default Album

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import React from "react";
import { cn, getInitials } from "@/lib/utils";
import FollowButton from "../FollowButton";

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  imageURL: string;
  name: string;
  isAdded: boolean;
  artistName: string;
}

const Album = ({
  id,
  imageURL,
  name,
  isAdded,
  artistName,
  className,
  ...props
}: AlbumProps) => {
  return (
    <>
      <div
        className={cn(
          "flex w-full rounded-md duration-200 items-center hover:bg-accent/30",
          className
        )}
        {...props}
      >
        <button
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
        </button>
        <FollowButton isAdded={isAdded} />
      </div>
    </>
  );
};

export default Album;

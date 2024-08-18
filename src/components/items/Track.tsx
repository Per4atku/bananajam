"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { forwardRef, useState } from "react";
import { BookmarkPlus, Check, Play } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import FollowButton from "../FollowButton";

interface TrackProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  imageURL: string;
  name: string;
  isAdded: boolean;
  artistName: string;
  albumName: string;
}

const Track = ({
  id,
  imageURL,
  name,
  isAdded,
  artistName,
  albumName,
  className,
  ...props
}: TrackProps) => {
  const [isOptimisticallyAdded, setIsOptimisticallyAdded] =
    useState<boolean>(isAdded);
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
          <div className="relative h-12 w-12">
            <Avatar className="w-full h-full rounded-sm">
              <AvatarImage src={imageURL} alt={name} />
              <AvatarFallback className="rounded-sm">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center ">
              <div className="bg-card w-full h-full absolute rounded-sm  opacity-30"></div>
              <Play
                size={18}
                className="relative shadow-2xl hover:opacity-90 duration-150"
                fill={"#fff"}
              />
            </div>
          </div>
          <div className="ml-3 overflow-hidden">
            <h3
              className="text-xl font-medium whitespace-nowrap 
                        overflow-hidden overflow-ellipsis text-left sm:text-2xl
                        
          "
            >
              {name}
            </h3>
            <p className="text-left text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap w-full flex justify-between  text-xs sm:text-sm ">
              {artistName} • {albumName}
            </p>
          </div>
        </button>
        <FollowButton isAdded={isAdded} />
      </div>
    </>
  );
};

export default Track;

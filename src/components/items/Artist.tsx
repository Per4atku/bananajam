"use client";

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { BookmarkPlus, Check } from "lucide-react";

interface ArtistProps {
  imageURL: string;
  name: string;
  isAdded: boolean;
}

const Artist = ({ imageURL, name, isAdded }: ArtistProps) => {
  const [isOptimisticallyAdded, setIsOptimisticallyAdded] =
    useState<boolean>(isAdded);
  return (
    <>
      <div className="flex cursor-pointer items-center  w-full my-5">
        <button
          onClick={() => toast(name)}
          className="flex items-center w-full"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={imageURL} alt="Pink Floyd" />
          </Avatar>
          <h3 className="ml-3 text-xl font-medium">{name}</h3>
        </button>
        <form
          action={(formData: FormData) => {
            setIsOptimisticallyAdded((prev) => !prev);
          }}
        >
          <Button
            variant={isOptimisticallyAdded ? "secondary" : "default"}
            onClick={() => toast("follow!")}
          >
            {isOptimisticallyAdded ? (
              <>
                <Check /> <p className="ml-1.5">Added to library</p>
              </>
            ) : (
              <>
                <BookmarkPlus /> <p className="ml-1.5">Add to library</p>
              </>
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Artist;

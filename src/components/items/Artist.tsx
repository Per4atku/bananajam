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
      <div className="flex items-center my-5 ">
        <div className="flex w-full items-center">
          <button
            onClick={() => toast(name)}
            className="flex items-center w-full py-2 overflow-hidden"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={imageURL} alt="Pink Floyd" />
            </Avatar>
            <h3
              className="ml-3 text-2xl font-medium whitespace-nowrap 
                        overflow-hidden overflow-ellipsis text-left
                        
          "
            >
              {name}
            </h3>
            <p className=" italic text-sm mx-2 ">(artist)</p>
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
      </div>
    </>
  );
};

export default Artist;

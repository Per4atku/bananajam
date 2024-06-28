"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { BookmarkPlus, Check } from "lucide-react";

interface ArtistProps {
  imageURL: string;
  name: string;
  isAdded: boolean;
  genres: string[];
}

const Artist = ({ imageURL, name, isAdded, genres }: ArtistProps) => {
  const [isOptimisticallyAdded, setIsOptimisticallyAdded] =
    useState<boolean>(isAdded);
  return (
    <>
      <div className="flex w-full rounded-md p-2 duration-200 items-center my-3 hover:bg-accent">
        <button
          onClick={() => toast(name)}
          className="flex items-center w-full py-2  overflow-hidden"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={imageURL} alt={name} />
            <AvatarFallback>BJ</AvatarFallback>
          </Avatar>
          <div className="ml-3 overflow-hidden">
            <h3
              className="text-xl font-medium whitespace-nowrap 
                        overflow-hidden overflow-ellipsis text-left sm:text-2xl
                        
          "
            >
              {name}
            </h3>
            <p className="text-left text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap italic text-xs sm:text-sm ">
              {genres.map((genre, index) => {
                if (index + 1 === genres.length) return <> {genre}</>;
                return <> {genre},</>;
              })}
            </p>
          </div>
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
                <Check size={18} /> <p className="ml-1.5">In Library</p>
              </>
            ) : (
              <>
                <BookmarkPlus size={18} /> <p className="ml-1.5">Add</p>
              </>
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Artist;

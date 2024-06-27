"use client";

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface ArtistProps {
  imageURL: string;
  name: string;
}

const Artist = ({ imageURL, name }: ArtistProps) => {
  return (
    <>
      <div className="flex cursor-pointer items-center  w-full">
        <button
          onClick={() => toast(name)}
          className="flex items-center w-full"
        >
          <Avatar className="h-16 w-16">
            <AvatarImage src={imageURL} alt="Pink Floyd" />
          </Avatar>
          <h3 className="ml-5 text-xl font-medium">{name}</h3>
        </button>
        <Button onClick={() => toast("follow!")}>Follow</Button>
      </div>
    </>
  );
};

export default Artist;

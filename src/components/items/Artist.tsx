"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import FollowButton from "../FollowButton";

interface ArtistProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  imageURL: string;
  name: string;
  isAdded: boolean;
  genres: string[];
}

const artistPageBaseURL = "/artist/";

const Artist = ({
  imageURL,
  name,
  isAdded,
  genres,
  id,
  className,
  ...props
}: ArtistProps) => {
  return (
    <>
      <div
        className={cn(
          "flex w-full rounded-md duration-200 items-center hover:bg-accent/30 ",
          className
        )}
        {...props}
      >
        <Link
          href={artistPageBaseURL + id}
          className="flex items-center w-full py-2  overflow-hidden"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={imageURL} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="ml-3 overflow-hidden ">
            <h3
              className="text-xl font-medium whitespace-nowrap 
                        overflow-hidden overflow-ellipsis text-left sm:text-2xl           
          "
            >
              {name}
            </h3>
            <p className="text-left text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap italic text-xs sm:text-sm ">
              {genres.map((genre, index) => {
                if (index + 1 === genres.length)
                  return <span key={index}> {genre}</span>;
                return <span key={index}> {genre},</span>;
              })}
            </p>
          </div>
        </Link>
        <FollowButton isAdded={isAdded} />
      </div>
    </>
  );
};

export default Artist;

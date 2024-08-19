import { musicDataAPI } from "@/apis/musicDataAPI";
import Track from "../items/Track";
import { Separator } from "../ui/separator";
import React from "react";

interface TopTracksProps {
  artistId: string;
}

const TopTracks = async ({ artistId }: TopTracksProps) => {
  const topTracks = (await musicDataAPI.getArtistTopTracks(artistId)).data;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[600px] ">
        {topTracks.tracks.slice(0, 5).map((track, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center" key={index}>
              <p className=" font-bold text-lg mr-2">{index + 1}</p>
              <Track
                id={track.id}
                imageURL={track.album.images.at(2)?.url || ""}
                name={track.name}
                isAdded={false}
                artistName={track.artists
                  .map((artist) => artist.name)
                  .toString()}
                albumName={track.album.name}
                className="px-2 my-1.5"
              />
            </div>
            {index + 1 !== 5 && (
              <Separator className=" bg-primary opacity-30" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TopTracks;

"use client";

import { musicDataAPI } from "@/apis/musicDataAPI";
import Artist from "../items/Artist";
import Album from "../items/Album";
import Track from "../items/Track";
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface SearchContentProps {
  sort_by: string;
  query: string;
}

const ITEMS_PER_SCROLL = 9;

const ArtistResults = ({ query }: { query: string }) => {
  const [offset, setOffset] = useState<number>(0);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["artists", query],
    queryFn: async () => {
      return await musicDataAPI.getArtists(ITEMS_PER_SCROLL, query, offset);
    },
  });
  if (isPending) {
    return <span>Loading artists...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      {data &&
        data.map((artist, index) => (
          <>
            <Artist
              key={index}
              name={artist.name}
              genres={artist.genres}
              isAdded={false}
              imageURL={artist?.images[2]?.url}
            />
            <Separator />
          </>
        ))}
    </>
  );
};

const AlbumResults = async ({ query }: { query: string }) => {
  const [offset, setOffset] = useState<number>(0);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["albums", query],
    queryFn: async () => {
      return await musicDataAPI.getAlbums(ITEMS_PER_SCROLL, query, offset);
    },
  });
  if (isPending) {
    return <span>Loading albums...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      {data &&
        data.map((album, index) => (
          <>
            <Album
              key={index}
              name={album.name}
              artistName={album.artists.map((artist) => artist.name).toString()}
              isAdded={false}
              imageURL={album?.images[2]?.url}
            />
            <Separator />
          </>
        ))}
    </>
  );
};

const TrackResults = async ({ query }: { query: string }) => {
  const [offset, setOffset] = useState<number>(0);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tracks", query],
    queryFn: async () => {
      return await musicDataAPI.getTracks(ITEMS_PER_SCROLL, query, offset);
    },
  });
  if (isPending) {
    return <span>Loading tracks...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      {data &&
        data.map((track, index) => (
          <>
            <Track
              key={index}
              name={track.name}
              imageURL={track.album?.images[2]?.url}
              isAdded={false}
              artistName={track.artists.map((artist) => artist.name).toString()}
              albumName={track.album.name}
            />
            <Separator />
          </>
        ))}
    </>
  );
};

const SearchResults = ({ query, sort_by }: SearchContentProps) => {
  if (query)
    if (sort_by === "artist") {
      return <ArtistResults query={query} />;
    } else if (sort_by === "album") {
      return <AlbumResults query={query} />;
    } else if (sort_by === "track") {
      return <TrackResults query={query} />;
    } else return <></>;
};

export default SearchResults;

"use client";

import {
  Album as AlbumType,
  Artist as ArtistType,
  musicDataAPI,
  Track as TrackType,
} from "@/apis/musicDataAPI";
import Artist from "../items/Artist";
import Album from "../items/Album";
import Track from "../items/Track";
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import { useDidUpdate } from "@siberiacancode/reactuse";

interface SearchContentProps {
  sort_by: string;
  query: string;
}

const ITEMS_PER_SCROLL = 9;

const ArtistResults = ({ query, sort_by }: SearchContentProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [artists, setArtists] = useState<ArtistType[]>();
  const { ref } = useInView({
    onChange: (inView) => {
      inView && setOffset((prev) => ITEMS_PER_SCROLL + prev);
    },
  });

  useDidUpdate(() => {
    setArtists([]);
    setOffset(0);
  }, [query, sort_by]);
  const { isPending, isError, error } = useQuery({
    queryKey: ["artists", query, offset],
    queryFn: async () => {
      const artists = await musicDataAPI.getArtists(
        ITEMS_PER_SCROLL,
        query,
        offset
      );

      setArtists((prev) => {
        if (prev) return [...prev, ...artists];
        else return [...artists];
      });
      return artists;
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isPending && !artists?.length)
    return (
      <>
        <div
          className="w-full h-full flex justify-center items-center my-12"
          ref={ref}
        >
          <BeatLoader color="#fff" size={15} className=" " />
        </div>
      </>
    );

  if (artists?.length)
    return (
      <>
        {artists.map((artist, index) => (
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
        <div className="w-full flex justify-center my-4" ref={ref}>
          <BeatLoader color="#fff" size={15} className=" " />
        </div>
      </>
    );
};

const AlbumResults = ({ query, sort_by }: SearchContentProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [albums, setAlbums] = useState<AlbumType[]>();
  const { inView, ref, entry } = useInView({
    onChange: (inView) => {
      inView && setOffset((prev) => ITEMS_PER_SCROLL + prev);
    },
  });
  const { isPending, isError, error } = useQuery({
    queryKey: ["albums", query, offset],
    queryFn: async () => {
      const albums = await musicDataAPI.getAlbums(
        ITEMS_PER_SCROLL,
        query,
        offset
      );

      setAlbums((prev) => {
        if (prev) return [...prev, ...albums];
        else return [...albums];
      });
      return albums;
    },
  });
  useDidUpdate(() => {
    setAlbums([]);
    setOffset(0);
  }, [query, sort_by]);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isPending && !albums?.length)
    return (
      <>
        <div
          className="w-full h-full flex justify-center items-center my-12"
          ref={ref}
        >
          <BeatLoader color="#fff" size={15} className=" " />
        </div>
      </>
    );
  if (albums?.length)
    return (
      <>
        {albums.map((album, index) => (
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
        <div className="w-full flex justify-center my-4" ref={ref}>
          <BeatLoader color="#fff" size={15} className=" " />
        </div>
      </>
    );
};

const TrackResults = ({ query, sort_by }: SearchContentProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [tracks, setTracks] = useState<TrackType[]>();
  const { ref } = useInView({
    onChange: (inView) => {
      inView && setOffset((prev) => ITEMS_PER_SCROLL + prev);
    },
  });
  const { isPending, isError, error } = useQuery({
    queryKey: ["tracks", query, offset],
    queryFn: async () => {
      const tracks = await musicDataAPI.getTracks(
        ITEMS_PER_SCROLL,
        query,
        offset
      );

      setTracks((prev) => {
        if (prev) return [...prev, ...tracks];
        else return [...tracks];
      });
      return tracks;
    },
  });

  useDidUpdate(() => {
    setTracks([]);
    setOffset(0);
  }, [query, sort_by]);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isPending && !tracks?.length)
    return (
      <div className="w-full flex justify-center my-12" ref={ref}>
        <BeatLoader color="#fff" size={15} className=" " />
      </div>
    );
  if (tracks?.length)
    return (
      <>
        {tracks.map((track, index) => (
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
        <div className="w-full flex justify-center my-4" ref={ref}>
          <BeatLoader color="#fff" size={15} className=" " />
        </div>
      </>
    );
};

const SearchResults = ({ query, sort_by }: SearchContentProps) => {
  if (query)
    if (sort_by === "artist") {
      return <ArtistResults query={query} sort_by={sort_by} />;
    } else if (sort_by === "album") {
      return <AlbumResults query={query} sort_by={sort_by} />;
    } else if (sort_by === "track") {
      return <TrackResults query={query} sort_by={sort_by} />;
    } else return <></>;
};

export default SearchResults;

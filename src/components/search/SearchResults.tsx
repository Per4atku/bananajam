"use client";

import { Item, musicDataAPI } from "@/apis/musicDataAPI";
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

const ITEMS_PER_SCROLL = 10;

const SearchResults = ({ query, sort_by }: SearchContentProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const { ref } = useInView({
    onChange: (inView, entry) => {
      entry.isIntersecting &&
        items?.length &&
        setOffset((prev) => ITEMS_PER_SCROLL + prev);
    },
  });
  const { isPending, isError, error } = useQuery({
    queryKey: [sort_by, query, offset],
    queryFn: async () => {
      const queryProps = {
        limit: ITEMS_PER_SCROLL,
        query: query,
        offset: offset,
      };
      switch (sort_by) {
        case "artist":
          const fetchedArtists = await musicDataAPI.getArtists({
            ...queryProps,
          });
          setItems((prev) => {
            if (prev) return [...prev, ...fetchedArtists];
            else return [...fetchedArtists];
          });

          return fetchedArtists;

        case "album":
          const fetchedAlbums = await musicDataAPI.getAlbums({ ...queryProps });
          setItems((prev) => {
            if (prev) return [...prev, ...fetchedAlbums];
            else return [...fetchedAlbums];
          });

          return fetchedAlbums;

        case "track":
          const fetchedTracks = await musicDataAPI.getTracks({ ...queryProps });
          setItems((prev) => {
            if (prev) return [...prev, ...fetchedTracks];
            else return [...fetchedTracks];
          });
          return fetchedTracks;
      }
    },
  });

  useDidUpdate(() => {
    setOffset(0);
    setItems([]);
  }, [query, sort_by]);

  if (isError) {
    if (!["artist", "album", "track"].includes(sort_by))
      return <div>Click any of the filters</div>;
    else
      return (
        <div>
          Error {error.name}:{error.message}
        </div>
      );
  }
  if (!items?.length)
    return (
      <div className="w-full flex justify-center my-12" ref={ref}>
        <BeatLoader color="#fff" size={15} className=" " />
      </div>
    );
  else
    return (
      <>
        {items.map((item, index) => {
          switch (sort_by) {
            case "artist":
              return (
                <>
                  <Artist
                    id={item.id}
                    key={index}
                    name={item.name}
                    genres={"genres" in item ? item.genres : []}
                    isAdded={false}
                    imageURL={"images" in item ? item?.images[2]?.url : ""}
                  />
                </>
              );

            case "album":
              return (
                <>
                  <Album
                    id={item.id}
                    key={index}
                    name={item.name}
                    artistName={
                      "artists" in item
                        ? item.artists.map((artist) => artist.name).toString()
                        : ""
                    }
                    isAdded={false}
                    imageURL={"images" in item ? item?.images[2]?.url : ""}
                  />
                </>
              );

            case "track":
              return (
                <>
                  <Track
                    id={item.id}
                    key={index}
                    name={item.name}
                    imageURL={"album" in item ? item.album?.images[2]?.url : ""}
                    isAdded={false}
                    artistName={
                      "artists" in item
                        ? item.artists.map((artist) => artist.name).toString()
                        : ""
                    }
                    albumName={"album" in item ? item.album.name : ""}
                  />
                </>
              );
          }
        })}

        <div className="w-full flex justify-center my-4" ref={ref}>
          <BeatLoader color="#fff" size={15} className=" " />
        </div>
      </>
    );
};

export default SearchResults;

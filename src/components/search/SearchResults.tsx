"use client";

import { Item, musicDataAPI } from "@/apis/musicDataAPI";
import Artist from "../items/Artist";
import Album from "../items/Album";
import Track from "../items/Track";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import { useDidUpdate } from "@siberiacancode/reactuse";
import Loader from "../Loader";

interface SearchContentProps {
  sort_by: string;
  query: string;
}

interface Page {
  data: any;
  previousCursor?: number;
  nextCursor?: number;
}

const ITEMS_PER_SCROLL = 10;

const SearchResults = ({ query, sort_by }: SearchContentProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const { ref } = useInView({
    onChange: (_, entry) => {
      entry.isIntersecting && items?.length && fetchNextPage();
    },
  });

  const { isError, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search-items", sort_by, query],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const queryProps = {
        limit: ITEMS_PER_SCROLL,
        query: query,
        offset: pageParam,
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
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.length === 0) {
        return undefined;
      }
      return lastPageParam + ITEMS_PER_SCROLL;
    },
  });

  useDidUpdate(() => {
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
                <Artist
                  id={item.id}
                  key={index}
                  name={item.name}
                  genres={"genres" in item ? item.genres : []}
                  isAdded={false}
                  imageURL={"images" in item ? item?.images[2]?.url : ""}
                />
              );

            case "album":
              return (
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
              );

            case "track":
              return (
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
              );
          }
        })}

        <Loader loaderRef={ref} />
      </>
    );
};

export default SearchResults;

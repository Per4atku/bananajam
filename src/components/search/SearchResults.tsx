"use client";

import Artist from "../items/Artist";
import Album from "../items/Album";
import Track from "../items/Track";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import Loader from "../Loader";
import { useSearchItem } from "@/hooks/useSearchItem";

interface SearchContentProps {
  sort_by: string;
  query: string;
}

const ITEMS_PER_SCROLL = 10;

const SearchResults = ({ query, sort_by }: SearchContentProps) => {
  const { items, fetchMore, isError, error } = useSearchItem({
    query,
    sort_by,
    itemsPerSroll: ITEMS_PER_SCROLL,
  });

  const { ref } = useInView({
    onChange: (_, entry) => {
      entry.isIntersecting && items?.length && fetchMore();
    },
  });

  if (isError) {
    if (!["artist", "album", "track"].includes(sort_by))
      return <div>Click any of the filters</div>;
    else
      return (
        <div>
          Error {error?.name}:{error?.message}
        </div>
      );
  }
  if (!items?.length)
    return (
      <div className="w-full flex justify-center my-12">
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
                  className="my-3 p-2"
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
                  className="my-3 p-2"
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
                  className="my-3 p-2"
                />
              );
          }
        })}

        <Loader loaderRef={ref} />
      </>
    );
};

export default SearchResults;

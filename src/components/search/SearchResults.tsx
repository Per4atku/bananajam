"use client"

import { useSearchItem } from "@/hooks/useSearchItem"
import React from "react"
import { useInView } from "react-intersection-observer"
import { BeatLoader } from "react-spinners"

import Loader from "../Loader"
import Album from "../items/Album"
import Artist from "../items/Artist"
import Track from "../items/Track"

interface SearchContentProps {
  sort_by: string
  query: string
}

const ITEMS_PER_SCROLL = 10

const SearchResults = ({ query, sort_by }: SearchContentProps) => {
  const {
    artists,
    albums,
    tracks,
    fetchMore,
    isError,
    error,
    isSuccess,
    isLoading,
  } = useSearchItem({
    query,
    sort_by,
    itemsPerSroll: ITEMS_PER_SCROLL,
  })

  const { ref } = useInView({
    onChange: (_, entry) => {
      entry.isIntersecting && isSuccess && fetchMore()
    },
  })

  if (isError) {
    if (!["artist", "album", "track"].includes(sort_by))
      return <div>Click any of the filters</div>
    else
      return (
        <div>
          Error {error?.name}:{error?.message}
        </div>
      )
  }

  if (artists?.length && sort_by === "artist") {
    return (
      <>
        {artists.map((artist, index) => (
          <React.Fragment key={index}>
            <Artist
              id={artist.id!}
              name={artist.name!}
              genres={artist.genres!}
              isAdded={false}
              imageURL={"images" in artist ? artist.images![2]?.url : ""}
              className="my-3 p-2"
            />
          </React.Fragment>
        ))}
        <Loader loaderRef={ref} />
      </>
    )
  }

  if (albums?.length && sort_by === "album") {
    return (
      <>
        {albums.map((album, index) => (
          <React.Fragment key={index}>
            <Album
              id={album.id}
              name={album.name}
              artistId={album.artists![0].id || ""}
              artistName={album
                .artists!.map((artist) => artist.name)
                .toString()}
              isAdded={false}
              imageURL={album.images[2].url}
              className="my-3 p-2"
            />
          </React.Fragment>
        ))}
        <Loader loaderRef={ref} />
      </>
    )
  }
  if (tracks?.length && sort_by === "track") {
    return (
      <>
        {tracks.map((track, index) => (
          <React.Fragment key={index}>
            <Track
              id={track.id!}
              name={track.name!}
              imageURL={track.album?.images[2]?.url!}
              isAdded={false}
              artistName={track
                .artists!.map((artist) => artist.name)
                .toString()}
              albumName={track.album?.name!}
              className="my-3 p-2"
            />
          </React.Fragment>
        ))}
        <Loader loaderRef={ref} />
      </>
    )
  } else {
    return (
      <div className="w-full flex justify-center my-12">
        <BeatLoader color="#fff" size={15} className="" />
      </div>
    )
  }
}

export default SearchResults

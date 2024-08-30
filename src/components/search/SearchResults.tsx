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
  if (!artists?.length && !albums?.length && !tracks?.length)
    return (
      <div className="w-full flex justify-center my-12">
        <BeatLoader color="#fff" size={15} className="" />
      </div>
    )

  if (artists?.length) {
    return (
      <>
        {artists.map((artist, index) => (
          <React.Fragment key={index}>
            <Artist
              id={artist.id!}
              name={artist.name!}
              genres={artist.genres!}
              isAdded={false}
              imageURL={artist.images![2].url}
              className="my-3 p-2"
            />
          </React.Fragment>
        ))}
        <Loader loaderRef={ref} />
      </>
    )
  }

  if (albums?.length) {
    return (
      <>
        {albums.map((album, index) => (
          <React.Fragment key={index}>
            <Album
              id={album.id}
              name={album.name}
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
  if (tracks?.length) {
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
  }
}

export default SearchResults

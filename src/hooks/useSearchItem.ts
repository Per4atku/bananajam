import { AlbumObject, ArtistObject, TrackObject } from "@/generated/api"
import { searchItem } from "@/lib/spotify/spotify"
import { useDidUpdate } from "@siberiacancode/reactuse"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useState } from "react"

import useAccessToken from "./useAccessToken"

interface useSearchItemProps {
  query: string
  sort_by: string
  itemsPerSroll: number
}

interface useSearchItemReturn {
  artists: ArtistObject[] | undefined
  albums: AlbumObject[] | undefined
  tracks: TrackObject[] | undefined
  isError: boolean
  error: Error | null
  fetchMore: () => void
  isSuccess: boolean
  isLoading: boolean
}

export const useSearchItem = ({
  query,
  sort_by,
  itemsPerSroll,
}: useSearchItemProps): useSearchItemReturn => {
  useAccessToken()
  const [artists, setArtists] = useState<ArtistObject[]>()
  const [albums, setAlbums] = useState<AlbumObject[]>()
  const [tracks, setTracks] = useState<TrackObject[]>()

  const { isError, error, fetchNextPage, isSuccess, isLoading } =
    useInfiniteQuery({
      queryKey: ["search-items", sort_by, query],
      initialPageParam: 0,
      queryFn: async ({ pageParam }) => {
        const response = await searchItem({
          query: query,
          offset: pageParam,
          type: sort_by,
        })

        if (response.artists) {
          const artists = response.artists?.items
          setArtists((prev) => (prev ? [...prev, ...artists!] : artists))
          return artists
        }
        if (response.albums) {
          const albums = response.albums?.items
          setAlbums((prev) => (prev ? [...prev, ...albums!] : albums))
          return albums
        }
        if (response.tracks) {
          const tracks = response.tracks.items
          setTracks((prev) => (prev ? [...prev, ...tracks!] : tracks))
        }
      },
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length === 0) {
          return undefined
        }
        return lastPageParam + itemsPerSroll
      },
    })

  useDidUpdate(() => {
    setAlbums([])
    setArtists([])
    setTracks([])
  }, [query])

  return {
    isLoading,
    isSuccess,
    artists,
    albums,
    tracks,
    isError,
    error,
    fetchMore: fetchNextPage,
  }
}

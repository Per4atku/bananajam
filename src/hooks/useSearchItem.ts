import {
  AlbumObject,
  ArtistObject,
  SearchItemsResponse,
  TrackObject,
} from "@/generated/api"
import { spotifyApi } from "@/utils/api/instance"
import { useDidUpdate } from "@siberiacancode/reactuse"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useState } from "react"
import { json } from "stream/consumers"

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
  const [artists, setArtists] = useState<ArtistObject[]>()
  const [albums, setAlbums] = useState<AlbumObject[]>()
  const [tracks, setTracks] = useState<TrackObject[]>()

  const { isError, error, fetchNextPage, isSuccess, isLoading } =
    useInfiniteQuery({
      queryKey: ["search-items", sort_by, query],
      initialPageParam: 0,
      queryFn: async ({ pageParam }) => {
        const queryProps = {
          limit: itemsPerSroll,
          query: query,
          offset: pageParam,
        }

        const response: SearchItemsResponse = await spotifyApi.get("search", {
          params: {
            q: query,
            limit: itemsPerSroll,
            offset: pageParam,
            market: "US",
            type: sort_by,
          },
          headers: {
            Authorization:
              "Bearer BQBVYTOdpBaBYMbb2S8U5lxAVWZzgdgxc_iHfSBDUXr0Dy2-S8_A5GG6dKbBut-6DCztw1_NPz9W5a4CJ--h41e5M44GuoF6jbBRbd7KYoQdJnogoPg",
          },
          cache: "no-cache",
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
  }, [query, sort_by])

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

"use client"

import { OneAlbumResponse } from "@/generated/api"
import { spotifyApi } from "@/utils/api/instance"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { createContext } from "react"

import Loader from "../Loader"
import AlbumCardGradientWrapper from "./AlbumCardGradientWrapper"
import ToArtist from "./ToArtist"
import TopSection from "./TopSection"
import TrackList from "./TrackList"

export const AlbumContext = createContext<OneAlbumResponse | undefined>(
  undefined,
)

interface AlbumCardProps {
  id: string
}

const AlbumCard = ({ id }: AlbumCardProps) => {
  const session = useSession()
  const albumfetch = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const data: OneAlbumResponse = await spotifyApi.get(`albums/${id}`, {
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
        },
      })
      return data
    },
  })
  if (!albumfetch.data)
    return (
      <div>
        <Loader />
      </div>
    )

  return (
    <AlbumContext.Provider value={albumfetch.data}>
      <AlbumCardGradientWrapper>
        <div>
          <ToArtist />
          <TopSection />
          <TrackList />
        </div>
      </AlbumCardGradientWrapper>
    </AlbumContext.Provider>
  )
}

export default AlbumCard

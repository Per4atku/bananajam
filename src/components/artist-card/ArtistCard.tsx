import { OneArtistResponse } from "@/generated/api"
import { getInitials } from "@/lib/utils"
import { spotifyApi } from "@/utils/api/instance"
import { cookies } from "next/headers"

import Loader from "../Loader"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { AlbumCarousel } from "./AlbumCarousel"
import TopTracks from "./TopTracks"

interface ArtistCardProps {
  artistId: string
}
const ArtistCard = async ({ artistId }: ArtistCardProps) => {
  const cookieStore = cookies()
  const artist: OneArtistResponse = await spotifyApi.get(
    `artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get("spotify_access_token")?.value}`,
      },
      cache: "no-cache",
    },
  )

  if (artist)
    return (
      <div className="w-full flex justify-center pt-12 flex-col gap-4">
        <div className="flex flex-col items-center gap-2 pb-4 sm:gap-4">
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40">
            <AvatarFallback className="text-5xl">
              {getInitials(artist.name!)}
            </AvatarFallback>
            <AvatarImage src={artist.images!.at(1)?.url} />
          </Avatar>
          <h1 className="text-center text-3xl font-bold sm:text-5xl">
            {artist.name}
          </h1>
          <p className=" text-center text-muted-foreground italic max-w-sm">
            {artist.genres!.toString()}
          </p>
        </div>

        <div className=" flex flex-col gap-4  sm:grid lg:grid-cols-2 lg:grid-rows-1">
          <AlbumCarousel fallback={<Loader />} artistId={artist.id!} />
          <TopTracks artistId={artistId} />
        </div>
      </div>
    )
}

export default ArtistCard

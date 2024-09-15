import { InterceptingDrawer } from "@/components/InterceptingDrawer"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import ArtistCard from "@/components/artist-card/ArtistCard"

interface ArtistDrawerProps {
  params: { artistId: string }
  searchParams: {
    album: string | undefined
  }
}

const ArtistDrawer = ({ params, searchParams }: ArtistDrawerProps) => {
  return (
    <InterceptingDrawer>
      <MaxWidthWrapper>
        <ArtistCard artistId={params.artistId} album={searchParams.album} />
      </MaxWidthWrapper>
    </InterceptingDrawer>
  )
}

export default ArtistDrawer

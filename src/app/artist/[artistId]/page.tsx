import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import ArtistCard from "@/components/artist-card/ArtistCard"

interface ArtistPageProps {
  params: { artistId: string }
  searchParams: {
    album: string | undefined
  }
}

const ArtistPage = ({ params, searchParams }: ArtistPageProps) => {
  return (
    <MaxWidthWrapper>
      <ArtistCard artistId={params.artistId} album={searchParams?.album} />
    </MaxWidthWrapper>
  )
}

export default ArtistPage

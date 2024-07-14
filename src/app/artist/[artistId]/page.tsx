import ArtistCard from "@/components/artist-card/ArtistCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface ArtistPageProps {
  params: { artistId: string };
}

const ArtistPage = ({ params }: ArtistPageProps) => {
  return (
    <MaxWidthWrapper>
      <ArtistCard artistId={params.artistId} />
    </MaxWidthWrapper>
  );
};

export default ArtistPage;

import ArtistCard from "@/components/artist-card/ArtistCard";
import { InterceptingDrawer } from "@/components/InterceptingDrawer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface ArtistDrawerProps {
  params: {
    artistId: string;
  };
}

const ArtistDrawer = ({ params }: ArtistDrawerProps) => {
  return (
    <InterceptingDrawer>
      <MaxWidthWrapper>
        <ArtistCard artistId={params.artistId} />
      </MaxWidthWrapper>
    </InterceptingDrawer>
  );
};

export default ArtistDrawer;

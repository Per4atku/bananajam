import ArtistCard from "@/components/artist-card/ArtistCard";
import { InterceptingDrawer } from "@/components/InterceptingDrawer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Suspense } from "react";

interface ArtistDrawerProps {
  params: {
    artistId: string;
  };
}

const ArtistDrawer = ({ params }: ArtistDrawerProps) => {
  return (
    <InterceptingDrawer>
      <MaxWidthWrapper>
        <Suspense fallback={<div>Wait...</div>}>
          <ArtistCard artistId={params.artistId} />
        </Suspense>
      </MaxWidthWrapper>
    </InterceptingDrawer>
  );
};

export default ArtistDrawer;

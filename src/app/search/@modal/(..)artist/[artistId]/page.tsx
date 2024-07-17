import ArtistCard from "@/components/artist-card/ArtistCard";
import { InterceptingDrawer } from "@/components/InterceptingDrawer";
import Loader from "@/components/Loader";
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
        <Suspense
          fallback={
            <div className="w-full h-[90dvh] flex justify-center items-center">
              <Loader />
            </div>
          }
        >
          <ArtistCard artistId={params.artistId} />
        </Suspense>
      </MaxWidthWrapper>
    </InterceptingDrawer>
  );
};

export default ArtistDrawer;

import { musicDataAPI } from "@/apis/musicDataAPI";
import Album from "@/components/items/Album";
import Artist from "@/components/items/Artist";
import Track from "@/components/items/Track";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Search from "@/components/search/Search";
import SearchResults from "@/components/search/SearchResults";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

const Explore = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  return (
    <MaxWidthWrapper>
      <Search placeholder="Search for..." />

      {searchParams?.query ? (
        <Suspense fallback={<>loading...</>}>
          <SearchResults query={searchParams.query} />
        </Suspense>
      ) : (
        <>
          <h1 className="font-bold text-3xl mt-12">You might also like...</h1>
          <p className="mt-12">Some bullshit albums</p>
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default Explore;

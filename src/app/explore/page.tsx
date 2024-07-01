import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchInput from "@/components/search/SearchInput";
import SearchResults from "@/components/search/SearchResults";
import SortBy from "@/components/search/SortBy";
import { Suspense } from "react";

const Explore = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort_by?: string;
  };
}) => {
  return (
    <MaxWidthWrapper>
      <SearchInput placeholder="Search for..." />
      <SortBy />

      {searchParams?.query ? (
        <Suspense fallback={<>loading...</>}>
          <SearchResults
            sort_by={searchParams.sort_by || "artist"}
            query={searchParams.query}
          />
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

"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Search from "@/components/search/Search";
import SearchResults from "@/components/search/SearchResults";

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
      <SearchResults query={searchParams?.query} />
    </MaxWidthWrapper>
  );
};

export default Explore;

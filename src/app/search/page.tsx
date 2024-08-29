import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import SearchInput from "@/components/search/SearchInput"
import SearchResults from "@/components/search/SearchResults"
import SortBy from "@/components/search/SortBy"

const Explore = ({
  searchParams,
}: {
  searchParams?: {
    query?: string
    sort_by?: string
  }
}) => {
  return (
    <MaxWidthWrapper>
      <SearchInput placeholder="Search for..." />
      <SortBy />

      {searchParams?.query ? (
        <SearchResults
          query={searchParams.query}
          sort_by={searchParams.sort_by || "artist"}
        />
      ) : (
        <>
          <h1 className="font-bold text-3xl mt-12">You might also like...</h1>
          <p className="mt-12">Some bullshit albums</p>
        </>
      )}
    </MaxWidthWrapper>
  )
}

export default Explore

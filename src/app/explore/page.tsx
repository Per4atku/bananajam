import Artist from "@/components/items/Artist";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Search from "@/components/search/Search";
import { Separator } from "@/components/ui/separator";

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
        <>
          <Artist
            isAdded={true}
            name="Pink Floyd"
            imageURL="https://i.scdn.co/image/f0a39a8a196a87a7236bdcf8a8708f6d5d3547cc"
          />
          <Separator />
          <Artist
            isAdded={false}
            name="Pink Floyd sdsd sdjs ыввььвьв вьвл в ввыов оово ов  "
            imageURL="https://i.scdn.co/image/f0a39a8a196a87a7236bdcf8a8708f6d5d3547cc"
          />
          <Separator />
          <Artist
            isAdded={true}
            name="Pink Floyd"
            imageURL="https://i.scdn.co/image/f0a39a8a196a87a7236bdcf8a8708f6d5d3547cc"
          />
          <Separator />
          <Artist
            isAdded={true}
            name="Pink Floyd"
            imageURL="https://i.scdn.co/image/f0a39a8a196a87a7236bdcf8a8708f6d5d3547cc"
          />
        </>
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

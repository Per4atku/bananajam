import Album from "@/components/items/Album";
import Artist from "@/components/items/Artist";
import Track from "@/components/items/Track";
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
            genres={["Psychedelic Rock", "Prog rock"]}
            imageURL="https://i.scdn.co/image/f0a39a8a196a87a7236bdcf8a8708f6d5d3547cc"
          />
          <Separator />
          <Album
            isAdded={true}
            name={"Wish You Were Here"}
            artistName={"Pink Floyd"}
            imageURL={
              "https://i.scdn.co/image/ab67616d0000b2731a84d71391df7469c5ab8539"
            }
          />
          <Separator />
          <Track
            isAdded={true}
            name={"Wish You Were Here"}
            artistName={"Pink Floyd"}
            imageURL={
              "https://i.scdn.co/image/ab67616d0000b2731a84d71391df7469c5ab8539"
            }
            albumName="Wish You Were Here"
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

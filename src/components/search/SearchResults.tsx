import { musicDataAPI } from "@/apis/musicDataAPI";
import Artist from "../items/Artist";

interface SearchContentProps {
  query: string;
}

//add "async"
const SearchResults = async ({ query }: SearchContentProps) => {
  const artists = await musicDataAPI.getArtists(5, query, 0);
  console.log(artists);
  if (query)
    return (
      <>
        {artists.map((artist, index) => (
          <>
            <Artist
              key={index}
              name={artist.name}
              genres={artist.genres}
              isAdded={false}
              imageURL={artist.images[2].url}
            />
          </>
        ))}
      </>
    );
  else return <></>;
};

export default SearchResults;

import { musicDataAPI } from "@/apis/musicDataAPI";
import Artist from "../items/Artist";

interface SearchContentProps {
  query: string;
}

const SearchResults = async ({ query }: SearchContentProps) => {
  const artists = await musicDataAPI.getArtists(5, query, 0);
  console.log(artists[0].images[0]);
  if (query)
    return (
      <>
        {artists &&
          artists.map((artist, index) => (
            <>
              <Artist
                key={index}
                name={artist.name}
                genres={artist.genres}
                isAdded={false}
                imageURL={artist?.images[2]?.url}
              />
            </>
          ))}
      </>
    );
  else return <></>;
};

export default SearchResults;

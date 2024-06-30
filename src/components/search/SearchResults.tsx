import { musicDataAPI } from "@/apis/musicDataAPI";
import Artist from "../items/Artist";
import Album from "../items/Album";
import Track from "../items/Track";

interface SearchContentProps {
  sort_by: string;
  query: string;
}

const SearchResults = async ({ query, sort_by }: SearchContentProps) => {
  if (query)
    if (sort_by === "artist") {
      const artists = await musicDataAPI.getArtists(5, query, 0);
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
    } else if (sort_by === "album") {
      const albums = await musicDataAPI.getAlbums(5, query, 0);

      return (
        <>
          {albums &&
            albums.map((album, index) => (
              <>
                <Album
                  key={index}
                  name={album.name}
                  artistName={album.artists
                    .map((artist) => artist.name)
                    .toString()}
                  isAdded={false}
                  imageURL={album?.images[2]?.url}
                />
              </>
            ))}
        </>
      );
    } else if (sort_by === "track") {
      const tracks = await musicDataAPI.getTracks(5, query, 0);

      return (
        <>
          {tracks &&
            tracks.map((track, index) => (
              <>
                <Track
                  key={index}
                  name={track.name}
                  imageURL={track.album.images[2].url}
                  isAdded={false}
                  artistName={track.artists
                    .map((artist) => artist.name)
                    .toString()}
                  albumName={track.album.name}
                />
              </>
            ))}
        </>
      );
    } else return <></>;
};

export default SearchResults;

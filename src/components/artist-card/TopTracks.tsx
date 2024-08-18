import { musicDataAPI } from "@/apis/musicDataAPI";
import Track from "../items/Track";

interface TopTracksProps {
  artistId: string;
}

const TopTracks = async ({ artistId }: TopTracksProps) => {
  const topTracks = (await musicDataAPI.getArtistTopTracks(artistId)).data;

  return (
    <div>
      {topTracks.tracks.slice(0, 5).map((track, index) => (
        <div className="flex items-center" key={index}>
          <p className="">{index + 1}</p>
          <Track
            id={track.id}
            imageURL={track.album.images.at(2)?.url || ""}
            name={track.name}
            isAdded={false}
            artistName={track.artists.map((artist) => artist.name).toString()}
            albumName={track.album.name}
          />
        </div>
      ))}
    </div>
  );
};

export default TopTracks;

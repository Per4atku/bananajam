import { musicDataAPI } from "@/apis/musicDataAPI";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Album from "../items/Album";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getInitials } from "@/lib/utils";
import Artist from "../items/Artist";

interface ArtistCardProps {
  artistId: string;
}
const ArtistCard = async ({ artistId }: ArtistCardProps) => {
  const artist = (await musicDataAPI.getArtistById(artistId)).data;
  const albums = (await musicDataAPI.getArtistsAlbums(artistId)).data;

  if (artist)
    return (
      <div className="w-full flex justify-center pt-12 flex-col">
        <div className="flex flex-col items-center gap-4 pb-4">
          <Avatar className="w-40 h-40">
            <AvatarFallback className="text-5xl">
              {getInitials(artist.name)}
            </AvatarFallback>
            <AvatarImage
              width={160}
              height={160}
              src={artist.images.at(1)?.url}
            />
          </Avatar>
          <h1 className="text-center text-5xl font-bold">{artist.name}</h1>
          <p className=" text-center text-muted-foreground italic max-w-sm">
            {artist.genres.toString()}
          </p>
        </div>

        {/* Experemental */}
        <div>
          {albums.items.map((album) => (
            <Album
              id={album.id}
              name={album.name}
              imageURL={album.images.at(2)?.url || ""}
              isAdded={false}
              artistName={artist.name}
            />
          ))}
        </div>
      </div>
    );
};

export default ArtistCard;

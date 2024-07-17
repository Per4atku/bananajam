import { musicDataAPI } from "@/apis/musicDataAPI";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Album from "../items/Album";
import { ScrollArea } from "@radix-ui/react-scroll-area";

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
            <AvatarFallback className="text-5xl">BJ</AvatarFallback>
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
      </div>
    );
};

export default ArtistCard;

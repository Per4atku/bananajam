import { musicDataAPI } from "@/apis/musicDataAPI";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ArtistCardProps {
  artistId: string;
}
const ArtistCard = async ({ artistId }: ArtistCardProps) => {
  const artist = (await musicDataAPI.getArtistById(artistId)).data;

  if (artist)
    return (
      <div className="w-full flex justify-center pt-12">
        <div className="flex flex-col items-center gap-4 pb-4">
          <Avatar className="w-40 h-40">
            <AvatarFallback className="text-5xl">BJ</AvatarFallback>
            <AvatarImage
              width={160}
              height={160}
              src={artist.images.at(0)?.url}
            />
          </Avatar>
          <h1 className="text-center text-5xl font-bold">{artist.name}</h1>
        </div>
      </div>
    );
};

export default ArtistCard;

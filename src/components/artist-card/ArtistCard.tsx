import { musicDataAPI } from "@/apis/musicDataAPI";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ArtistCardProps {
  artistId: string;
}
const ArtistCard = async ({ artistId }: ArtistCardProps) => {
  const artist = (await musicDataAPI.getArtistById(artistId)).data;

  if (artist)
    return (
      <div className="w-full">
        <div>
          <Avatar>
            <AvatarFallback>BJ</AvatarFallback>
            <AvatarImage height={500} width={500} src={artist.images[0].url} />
          </Avatar>
        </div>
      </div>
    );
};

export default ArtistCard;

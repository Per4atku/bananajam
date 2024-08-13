import { musicDataAPI } from "@/apis/musicDataAPI";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import { AlbumCarousel } from "./AlbumCarousel";

interface ArtistCardProps {
  artistId: string;
}
const ArtistCard = async ({ artistId }: ArtistCardProps) => {
  const artist = (await musicDataAPI.getArtistById(artistId)).data;

  if (artist)
    return (
      <div className="w-full flex justify-center pt-12 flex-col gap-4">
        <div className="flex flex-col items-center gap-2 pb-4 sm:gap-4">
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40">
            <AvatarFallback className="text-5xl">
              {getInitials(artist.name)}
            </AvatarFallback>
            <AvatarImage src={artist.images.at(1)?.url} />
          </Avatar>
          <h1 className="text-center text-3xl font-bold sm:text-5xl">
            {artist.name}
          </h1>
          <p className=" text-center text-muted-foreground italic max-w-sm">
            {artist.genres.toString()}
          </p>
        </div>

        <AlbumCarousel artistId={artist.id} />
      </div>
    );
};

export default ArtistCard;

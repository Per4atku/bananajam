interface ArtistCardProps {
  artistId: string;
}
const ArtistCard = ({ artistId }: ArtistCardProps) => {
  return <div className="text-red-500">{artistId}</div>;
};

export default ArtistCard;

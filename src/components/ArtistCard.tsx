interface ArtistCardProps {
  artistId: string;
}
const ArtistCard = ({ artistId }: ArtistCardProps) => {
  return <div>{artistId}</div>;
};

export default ArtistCard;

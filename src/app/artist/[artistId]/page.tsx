interface ArtistPageProps {
  params: { artistId: string };
}

const ArtistPage = ({ params }: ArtistPageProps) => {
  return <div>{params.artistId}</div>;
};

export default ArtistPage;

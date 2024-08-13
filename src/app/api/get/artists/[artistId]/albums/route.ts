import { musicDataAPI } from "@/apis/musicDataAPI";
import axios from "axios";

export const GET = async (
  request: Request,
  { params }: { params: { artistId: string } }
) => {
  const token = await musicDataAPI.getToken();
  const searchParams = new URLSearchParams([
    ["include_groups", "album,single"],
  ]);
  const requestUrl = `https://api.spotify.com/v1/artists/${params.artistId}/albums?include_groups=album&limit=50`;

  const response = await axios.get(requestUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Response.json(response.data);
};

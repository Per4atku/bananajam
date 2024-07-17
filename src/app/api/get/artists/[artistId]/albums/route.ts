import { musicDataAPI } from "@/apis/musicDataAPI";
import axios from "axios";

export const GET = async (
  request: Request,
  { params }: { params: { artistId: string } }
) => {
  const token = await musicDataAPI.getToken();
  const requestUrl = `https://api.spotify.com/v1/artists/${params.artistId}/albums`;

  const response = await axios.get(requestUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Response.json(response.data);
};

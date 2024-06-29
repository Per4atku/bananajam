import axios from "axios";

export const revalidate = 3600;

export async function GET() {
  const tokenResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      grant_type: "client_credentials",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const token = tokenResponse.data.access_token;
  return Response.json(token);
}

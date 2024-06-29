import axios from "axios";

const apiRoute = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Item = "artist" | "album" | "track";
export type Artist = {
  id: string;
  name: string;
  images: any[];
  genres: string[];
};

export const musicDataAPI = {
  getToken: async () => {
    if (apiRoute) {
      const token = await axios.get(apiRoute + "/token");
      return token.data;
    } else
      throw new Error("No NEXT_PUBLIC_BACKEND_URL provided inside .env file");
  },
  getArtists: async (limit: number, query: string, offset: number) => {
    if (apiRoute) {
      const params = new URLSearchParams([
        ["q", query],
        ["limit", limit.toString()],
        ["type", "artist"],
        ["offset", offset.toString()],
      ]);
      console.log(apiRoute + "/search?" + params.toString());
      const artistsResultRaw = await axios.get(
        apiRoute + "/search?" + params.toString()
      );
      const artistsResult: Array<any> = artistsResultRaw.data.artists.items;

      const response: Array<Artist> = [];

      artistsResult.map((artist) => {
        response.push({
          id: artist.id,
          name: artist.name,
          images: artist.images,
          genres: artist.genres,
        });
      });

      return response;
    } else
      throw new Error("No NEXT_PUBLIC_BACKEND_URL provided inside .env file");
  },
};

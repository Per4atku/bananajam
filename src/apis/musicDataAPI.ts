import axios from "axios";

const apiRoute = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Images = Array<{ height: Number; url: string; width: Number }>;
export type Item = Track | Artist | Album;
export type Artist = {
  id: string;
  name: string;
  images: Images;
  genres: string[];
};
export type Album = {
  id: string;
  name: string;
  images: Images;
  artists: Artist[];
};

export type Track = {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
};
export interface getItemParameters {
  limit: number;
  query: string;
  offset: number;
}

export const musicDataAPI = {
  getToken: async () => {
    if (apiRoute) {
      const token = await axios.get(apiRoute + "/token");
      return token.data;
    } else
      throw new Error("No NEXT_PUBLIC_BACKEND_URL provided inside .env file");
  },
  getArtists: async ({ limit, query, offset }: getItemParameters) => {
    if (apiRoute) {
      const params = new URLSearchParams([
        ["q", query],
        ["limit", limit.toString()],
        ["type", "artist"],
        ["offset", offset.toString()],
      ]);
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

  getAlbums: async ({ limit, query, offset }: getItemParameters) => {
    if (apiRoute) {
      const params = new URLSearchParams([
        ["q", query],
        ["limit", limit.toString()],
        ["type", "album"],
        ["offset", offset.toString()],
      ]);
      const albumsResultRaw = await axios.get(
        apiRoute + "/search?" + params.toString()
      );
      const albumsResult: Array<any> = albumsResultRaw.data.albums.items;

      const response: Array<Album> = [];

      albumsResult.map((album) => {
        response.push({
          id: album.id,
          name: album.name,
          images: album.images,
          artists: album.artists,
        });
      });

      return response;
    } else
      throw new Error("No NEXT_PUBLIC_BACKEND_URL provided inside .env file");
  },

  getTracks: async ({ limit, query, offset }: getItemParameters) => {
    if (apiRoute) {
      const params = new URLSearchParams([
        ["q", query],
        ["limit", limit.toString()],
        ["type", "track"],
        ["offset", offset.toString()],
      ]);
      const trackResultRaw = await axios.get(
        apiRoute + "/search?" + params.toString()
      );
      const tracksResult: Array<any> = trackResultRaw.data.tracks.items;

      const response: Array<Track> = [];

      tracksResult.map((track) => {
        response.push({
          id: track.id,
          name: track.name,
          artists: track.artists,
          album: track.album,
        });
      });

      return response;
    } else
      throw new Error("No NEXT_PUBLIC_BACKEND_URL provided inside .env file");
  },
};

import { HttpClient } from "./http-client"

export const spotifyApi = new HttpClient({
  baseURL: "https://api.spotify.com/v1",
})

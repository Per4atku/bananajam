import {
  ManyTracksResponse,
  OneAlbumResponse,
  OneArtistResponse,
  PagingArtistDiscographyAlbumObject,
  SearchItemsResponse,
} from "@/generated/api"
import { spotifyApi } from "@/utils/api/instance"
import { isSSR } from "@/utils/helpers/isSSR"

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const secret = process.env.SECRET
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

export const getAccessToken = async () => {
  if (isSSR) {
    const { cookies } = await import("next/headers")
    const access_token = cookies().get("spotify_access_token")?.value
    const refresh_token = cookies().get("spotify_refresh_token")?.value

    const response = await fetch(backend_url + "/token", {
      method: "GET",
      headers: {
        "Access-Token": access_token as string,
        "Refresh-Token": refresh_token as string,
      },
    })
    const data = await response.json()

    return data
  }

  const response = await fetch(backend_url + "/token", {
    method: "GET",
  })
  const data = await response.json()

  return data
}

export const searchItem = async (props: SearchItemProps) => {
  const { query, offset, type } = props
  const itemsPerScroll = 10
  const token = await getAccessToken()

  const response: SearchItemsResponse = await spotifyApi.get("search", {
    params: {
      q: query,
      limit: itemsPerScroll,
      offset: offset,
      market: "US",
      type: type,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}

export const getArtist = async (
  artistId: string,
): Promise<OneArtistResponse> => {
  const token = await getAccessToken()

  return await spotifyApi.get(`artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })
}

export const getArtistsAlbums = async (
  artistId: string,
): Promise<PagingArtistDiscographyAlbumObject> => {
  const token = await getAccessToken()

  return await spotifyApi.get(`artists/${artistId}/albums`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      include_groups: "album",
      limit: 50,
    },
  })
}

export const getAlbum = async (albumId: string): Promise<OneAlbumResponse> => {
  const token = await getAccessToken()

  return await spotifyApi.get(`albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getArtistsTopTracks = async (
  artistId: string,
): Promise<ManyTracksResponse> => {
  const token = await getAccessToken()

  return await spotifyApi.get(`artists/${artistId}/top-tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })
}

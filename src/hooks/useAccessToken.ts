import { useCookies } from "react-cookie"

const useAccessToken = () => {
  const [cookies] = useCookies([
    "spotify_access_token",
    "spotify_refresh_token",
  ])

  console.log(cookies.spotify_access_token)
  console.log(cookies.spotify_refresh_token)
}

export default useAccessToken

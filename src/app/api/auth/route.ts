export const GET = async (request: Request) => {
  const scope =
    "streaming \
               user-read-email \
               user-read-private"

  const state = process.env.SECRET

  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    scope: scope,
    redirect_uri: process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/callback",
    state: state as string,
  })

  return Response.redirect(
    "https://accounts.spotify.com/authorize/?" + queryParams.toString(),
  )
}

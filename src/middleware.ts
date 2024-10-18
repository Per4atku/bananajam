import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { PRIVATE_ROUTES, REDIRECT_TO_LOGIN } from "./lib/routes"

export function middleware(req: NextRequest) {
  // Get cookies from the request
  const spotifyAccessToken = req.cookies.get("spotify_access_token")?.value
  const spotifyRefreshToken = req.cookies.get("spotify_refresh_token")?.value

  // If the token exists, allow the request to proceed
  if (spotifyAccessToken || spotifyRefreshToken) {
    return NextResponse.next()
  }

  const loginUrl = new URL(REDIRECT_TO_LOGIN, req.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/search"],
}

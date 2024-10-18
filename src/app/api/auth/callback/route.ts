import { REDIRECT_AFTER_LOGIN } from "@/lib/routes"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  const url = request.nextUrl.clone()
  const { searchParams } = new URL(url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect("/")
  }

  const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
  const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const redirect_uri = process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/callback"

  const body = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  })

  const authOptions = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString(
          "base64",
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  }
  url.pathname = REDIRECT_AFTER_LOGIN
  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions,
    )

    if (!response.ok) {
      console.log(await response.json())
      return NextResponse.redirect(url)
    }

    const data = await response.json()

    cookies().set("spotify_access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })
    cookies().set("spotify_refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // Refresh token expiry time (30 days or more)
      path: "/",
    })

    return NextResponse.redirect(url)
  } catch (error) {
    console.error("Error fetching token:", error)
    return NextResponse.redirect(url)
  }
}

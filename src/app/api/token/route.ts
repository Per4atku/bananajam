import type { NextApiRequest, NextApiResponse } from "next"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const cookieStore = cookies()

  let access_token =
    cookieStore.get("spotify_access_token")?.value ||
    req.headers.get("Access-Token")
  let refresh_token =
    cookieStore.get("spotify_refresh_token")?.value ||
    req.headers.get("Refresh-Token")

  if (access_token) {
    console.log("we have valid access_token, return it")
    return NextResponse.json(access_token)
  }

  if (refresh_token) {
    console.log("we don't have valid access, but have valid refresh token")
    const url = "https://accounts.spotify.com/api/token"

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET,
          ).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        client_id: process.env.SPOTIFY_CLIENT_ID as string,
      }),
    }

    const response = await fetch(url, payload)
    const data = await response.json()

    console.log(data)
    if (!response.ok) console.error(data)

    cookies().set("spotify_access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })

    return NextResponse.json(data.access_token)
  } else return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

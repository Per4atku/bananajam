import NextAuth from "next-auth"
import { Session } from "next-auth"
import Spotify from "next-auth/providers/spotify"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = token.access_token as string
      session.refreshToken = token.refresh_token as string
      session.tokenExpiresAt = token.expires_at as number
      return session
    },
    async jwt({ token, account, session }) {
      if (account) {
        token.refresh_token = account.refresh_token
        token.access_token = account.access_token
        token.expires_at = account.expires_at
      } else if (Date.now() < (token.expires_at as number) * 1000) {
        //DEBUG CONSOLE LOG
        console.log("no need to refresh")
        return token
      } else {
        if (!token.refresh_token) throw new TypeError("Missing refresh_token")

        try {
          const url = "https://accounts.spotify.com/api/token"

          const payload = {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
              client_id: process.env.SPOTIFY_CLIENT_ID!,
            }),
          }
          const body = await fetch(url, payload)
          const response = await body.json()

          token.refresh_token = response.refresh_token
          token.access_token = response.access_token
          token.expires_at = Date.now() / 1000 + 3600
        } catch (e) {
          console.error("Error refreshing access_token", e)
          token.error = "RefreshTokenError"
        }
      }

      return token
    },
  },
})

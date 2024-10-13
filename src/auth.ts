import NextAuth from "next-auth"
import { Session } from "next-auth"
import Spotify from "next-auth/providers/spotify"

import { spotifyApi } from "./utils/api/instance"

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
    async session({ session, token }) {
      session.accessToken = token.access_token as string
      session.refreshToken = token.refresh_token as string
      session.tokenExpiresAt = token.expires_at as number

      return session
    },
    async jwt({ token, account }) {
      if (account) {
        token.refresh_token = account.refresh_token
        token.access_token = account.access_token
        token.expires_at = account.expires_at
        token.exp = account.expires_at

        console.log("First time login")

        return token
      } else if (Date.now() < 1728824120000) {
        console.log("Access token is still available")
        console.log(token.expires_at)
        return token
      } else {
        console.log("Refreshing your tokens!")

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
              client_id: process.env.SPOTIFY_CLIENT_ID as string,
            }),
          }
          const response = await fetch(url, payload)
          const tokensOrError = await response.json()

          if (!response.ok) throw tokensOrError

          const newTokens = tokensOrError as {
            access_token: string
            expires_in: number
            refresh_token: string
          }

          token.access_token = newTokens.access_token
          token.expires_at = Date.now() / 1000 + newTokens.expires_in
          token.refresh_token = newTokens.refresh_token

          console.log("refreshed!")

          return token
        } catch (error) {
          console.error("Error refreshing access_token", error)
          // If we fail to refresh the token, return an error so we can handle it on the page
          token.error = "RefreshTokenError"
          return token
        }
      }
    },
  },
})

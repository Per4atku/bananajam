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
      }

      return token
    },
  },
})

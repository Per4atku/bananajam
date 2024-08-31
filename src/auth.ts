import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
import { cookies } from "next/headers"

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
      session.user.id = token.id
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.refreshToken = account.refresh_token
        token.accessToken = account.access_token
        token.id = profile!.id
      }
      return token
    },
  },
})

import { auth } from "@/auth"

import { PUBLIC_ROUTES, REDIRECT_TO_LOGIN } from "./lib/routes"

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)

  console.log(isAuthenticated, isPublicRoute)
  console.log(nextUrl.pathname)

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(REDIRECT_TO_LOGIN, nextUrl))
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

import { auth, signIn } from "@/auth"
import { REDIRECT_AFTER_LOGIN } from "@/lib/routes"

export default async function Login() {
  const session = await auth()

  console.log(session)
  return (
    <form
      action={async () => {
        "use server"
        await signIn("spotify", { redirectTo: REDIRECT_AFTER_LOGIN })
      }}
    >
      <button type="submit">Signin with Spotify</button>
    </form>
  )
}

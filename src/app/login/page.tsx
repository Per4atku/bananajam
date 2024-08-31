import { auth, signIn } from "@/auth"

export default async function Login() {
  const session = await auth()

  console.log(session)
  return (
    <form
      action={async () => {
        "use server"
        await signIn("spotify")
      }}
    >
      <button type="submit">Signin with Spotify</button>
    </form>
  )
}

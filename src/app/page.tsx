import { buttonVariants } from "@/components/ui/button"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookieStore = cookies()
  console.log(cookieStore.get("spotify_access_token"))

  return (
    <div>
      <p>Home Page!</p>
      <Link href={"/search"} className={buttonVariants()}>
        Go to search page
      </Link>
    </div>
  )
}

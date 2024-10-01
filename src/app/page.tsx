import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  redirect("/search")
  return (
    <div>
      <p>Home Page!</p>
      <Link href={"/search"} className={buttonVariants()}>
        Go to search page
      </Link>
    </div>
  )
}

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <p>Home Page!</p>
      <Link href={"/search"} className={buttonVariants()}>
        Go to search page
      </Link>
    </div>
  );
}

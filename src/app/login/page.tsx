import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FaSpotify } from "react-icons/fa6"

interface BananaProps {
  top: number
  left: number
  size: number
  rotation: number
}

const Banana = ({ top, left, size, rotation }: BananaProps) => (
  <Image
    src="/banana.png"
    alt="Banana emoji"
    width={size}
    height={size}
    className="absolute"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      transform: `rotate(${rotation}deg)`,
      zIndex: 1,
      opacity: 0.2,
    }}
  />
)

export default async function Login() {
  const bananas = [
    {
      top: -2.3,
      left: -1.4,
      size: 130,
      rotation: 60,
    },
    {
      top: 40,
      left: 75,
      size: 160,
      rotation: 320,
    },
  ]

  return (
    <MaxWidthWrapper className="h-screen w-screen flex justify-center items-center">
      <Card className="w-full max-w-[600px] h-[400px] flex justify-center relative overflow-hidden shadow-lg shadow-slate-950 ">
        {bananas.map((banana, index) => (
          <Banana
            key={index}
            top={banana.top}
            left={banana.left}
            size={banana.size}
            rotation={banana.rotation}
          />
        ))}
        <div className="flex z-20 flex-col py-12 justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              alt="BananaJam logo"
              width={50}
              height={50}
            />

            <div>
              <h1 className="font-bold text-3xl text-center ">BananaJam</h1>
              <p className="text-[12px]">
                made with ❤️ by{" "}
                <Link className=" underline" href={"/tyoma"}>
                  tyoma
                </Link>
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <form
              action={async () => {
                "use server"
                redirect("/api/auth")
              }}
            >
              <Button type="submit" className="flex gap-2 py-8">
                <FaSpotify size={35} />
                <p className="text-xl font-medium">Connect your Spotify</p>
              </Button>
            </form>
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-[360px] opacity-50">
            BananaJam acts as an advanced Spotify client. So you need a Spotify
            Premium subscription for the service to work anyway
          </p>
        </div>
      </Card>
    </MaxWidthWrapper>
  )
}

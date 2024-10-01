"use client"

import useParams from "@/hooks/useParams"
import { ArrowLeft } from "lucide-react"
import { useContext } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { AlbumContext } from "./AlbumCard"

const ToArtist = () => {
  const album = useContext(AlbumContext)
  const { remove } = useParams()

  return (
    <Button
      variant={"ghost"}
      onClick={() => remove("album")}
      className="flex gap-1 items-center mt-4 px-2 py-5"
    >
      <ArrowLeft />
      <h3 className="text-xl flex items-center hover:underline   ">
        {album?.artists![0].name}
      </h3>
    </Button>
  )
}

export default ToArtist

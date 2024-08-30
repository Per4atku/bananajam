"use client"

import useParams from "@/hooks/useParams"
import { useEffect, useState } from "react"

import { Badge } from "../ui/badge"

const SortBy = () => {
  const searchParams = useParams()

  const [sortByItem, setSortByItem] = useState<string>(
    searchParams.get("sort_by") || "artist",
  )

  useEffect(() => {
    if (sortByItem == "artist") searchParams.remove("sort_by")
    else {
      searchParams.set("sort_by", sortByItem)
    }
  }, [sortByItem])

  return (
    <div className="flex gap-3 my-4">
      <button onClick={() => setSortByItem("artist")}>
        <Badge
          className="text-base py-1 px-5 rounded-xl "
          variant={sortByItem === "artist" ? "default" : "secondary"}
        >
          Artist
        </Badge>
      </button>
      <button onClick={() => setSortByItem("album")}>
        <Badge
          className="text-base py-1 px-5 rounded-xl "
          variant={sortByItem === "album" ? "default" : "secondary"}
        >
          Album
        </Badge>
      </button>
      <button onClick={() => setSortByItem("track")}>
        <Badge
          className="text-base py-1 px-5 rounded-xl "
          variant={sortByItem === "track" ? "default" : "secondary"}
        >
          Track
        </Badge>
      </button>
    </div>
  )
}

export default SortBy

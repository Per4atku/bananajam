"use client"

import Image from "next/image"
import { useContext } from "react"
import Tilt from "react-parallax-tilt"

import { AlbumContext } from "./AlbumCard"
import AlbumPlayButton from "./AlbumPlayButton"

const TopSection = () => {
  const album = useContext(AlbumContext)
  return (
    <div className="mt-8">
      <div className="w-full flex justify-center">
        <Tilt
          tiltMaxAngleX={10}
          scale={1.08}
          glareEnable
          gyroscope
          transitionSpeed={600}
        >
          <Image
            width={220}
            height={220}
            className="rounded-lg shadow-sm"
            alt="Album"
            src={album?.images.at(1)?.url || ""}
          />
        </Tilt>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="w-fit">
          <h1 className="w-full text-xl font-bold mt-4">{album?.name}</h1>
          <p className="text-sm text-muted-foreground font-medium mt-1.5">
            {album?.type} • {album?.release_date} • {album?.total_tracks} songs
          </p>
        </div>
        <div>
          <AlbumPlayButton />
        </div>
      </div>
    </div>
  )
}

export default TopSection

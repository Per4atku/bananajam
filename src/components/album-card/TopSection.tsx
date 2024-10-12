"use client"

import Image from "next/image"
import { useContext } from "react"
import Tilt from "react-parallax-tilt"
// @ts-ignore
import { Textfit } from "react-textfit"

import DesktopOnly from "../breakpoints/DesktopOnly"
import MobileOnly from "../breakpoints/MobileOnly"
import { AlbumContext } from "./AlbumCard"
import AlbumPlayButton from "./AlbumPlayButton"

const TopSection = () => {
  const album = useContext(AlbumContext)
  return (
    <>
      <MobileOnly>
        <div className="mt-8">
          <div className="w-full flex justify-center sm:w-auto">
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
                {album?.type} • {album?.release_date} • {album?.total_tracks}{" "}
                songs
              </p>
            </div>
            <div>
              <AlbumPlayButton />
            </div>
          </div>
        </div>
      </MobileOnly>

      <DesktopOnly>
        <div>
          <div className="mt-8 flex gap-4 items-center h-44">
            <div className="flex items-center ">
              <Tilt
                tiltMaxAngleX={7}
                tiltMaxAngleY={7}
                scale={1.04}
                glareEnable
                gyroscope
                transitionSpeed={600}
              >
                <Image
                  width={200}
                  height={200}
                  className="rounded-lg shadow-sm"
                  alt="Album"
                  src={album?.images.at(1)?.url || ""}
                />
              </Tilt>
            </div>
            <div className="w-full flex overflow-hidden overflow-ellipsis h-full items-center ">
              <Textfit
                className="flex font-bold overflow-ellipsis h-2/3 w-full  "
                mode="multi"
              >
                {album?.name}
              </Textfit>
            </div>
          </div>
          <p className=" text-muted-foreground font-medium mt-2">
            {album?.type} • {album?.release_date} • {album?.total_tracks} songs
          </p>
        </div>
      </DesktopOnly>
    </>
  )
}

export default TopSection

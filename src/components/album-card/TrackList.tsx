"use client"

import { useContext } from "react"
import { toast } from "sonner"

import FollowButton from "../FollowButton"
import { Separator } from "../ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { AlbumContext } from "./AlbumCard"

const TrackList = () => {
  const album = useContext(AlbumContext)
  return (
    <div className="mt-4">
      <Separator />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-5">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-center w-2">✓</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {album?.tracks?.items?.map((track, index) => (
            <TableRow className="h-16 rounded-md" key={index}>
              <TableCell className="font-bold">{track.track_number}</TableCell>
              <TableCell
                className="font-medium text-base "
                role="button"
                tabIndex={0}
                onClick={() => toast(`Play the: ${track.name}`)}
              >
                {track.name}
              </TableCell>
              <TableCell>
                <FollowButton className="w-8 h-8" isAdded={false} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TrackList

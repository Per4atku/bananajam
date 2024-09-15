import { ReactNode } from "react"

interface AlbumCardGradientWrapperProps {
  children: ReactNode
}

const AlbumCardGradientWrapper = ({
  children,
}: AlbumCardGradientWrapperProps) => {
  return (
    <>
      <div>{children}</div>
    </>
  )
}

export default AlbumCardGradientWrapper

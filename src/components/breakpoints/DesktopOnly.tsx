"use client"

import { useMediaQuery } from "@siberiacancode/reactuse"
import React, { ReactNode } from "react"

interface DesktopOnlyProps {
  breakpoint?: number
  children: ReactNode
}

const DesktopOnly = ({ children, breakpoint = 640 }: DesktopOnlyProps) => {
  const matches = useMediaQuery(`(min-width: ${breakpoint}px)`)
  if (matches) return <React.Fragment>{children}</React.Fragment>
}

export default DesktopOnly

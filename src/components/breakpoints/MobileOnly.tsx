"use client"

import { useMediaQuery } from "@siberiacancode/reactuse"
import React, { ReactNode } from "react"

interface MobileOnlyProps {
  breakpoint?: number
  children: ReactNode
}

const MobileOnly = ({ children, breakpoint = 640 }: MobileOnlyProps) => {
  const matches = useMediaQuery(`(max-width: ${breakpoint}px)`)
  if (matches) return <React.Fragment>{children}</React.Fragment>
}

export default MobileOnly

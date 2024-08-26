"use client"

import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useClickOutside, useKeyPress } from "@siberiacancode/reactuse"
import { useRouter } from "next/navigation"
import { ReactNode, Suspense } from "react"

import Loader from "./Loader"
import { Drawer, DrawerContent, DrawerTitle } from "./ui/drawer"

interface InterceptingDrawerProps {
  children: ReactNode
}

export const InterceptingDrawer = ({ children }: InterceptingDrawerProps) => {
  const router = useRouter()
  const pressedKeys = useKeyPress("Escape")
  const ref = useClickOutside<HTMLDivElement>(() => {
    router.back()
  })

  return (
    <Drawer
      open={!pressedKeys}
      onClose={() => {
        router.back()
      }}
    >
      <DrawerTitle className=" sr-only">Artist Card</DrawerTitle>
      <DrawerContent ref={ref}>
        <ScrollArea className=" overflow-auto h-[90dvh]">
          <Suspense
            fallback={
              <div className="w-full h-[90dvh] flex justify-center items-center">
                <Loader />
              </div>
            }
          >
            {children}
          </Suspense>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

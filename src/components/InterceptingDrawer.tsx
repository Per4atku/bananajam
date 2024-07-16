"use client";

import { useClickOutside, useKeyPress } from "@siberiacancode/reactuse";

import { ReactNode } from "react";
import { Drawer, DrawerContent } from "./ui/drawer";
import { useRouter } from "next/navigation";

interface InterceptingDrawerProps {
  children: ReactNode;
}

export const InterceptingDrawer = ({ children }: InterceptingDrawerProps) => {
  const router = useRouter();
  const pressedKeys = useKeyPress("Escape");
  const ref = useClickOutside<HTMLDivElement>(() => {
    router.back();
  });

  return (
    <Drawer
      open={!pressedKeys}
      onClose={() => {
        router.back();
      }}
    >
      <DrawerContent ref={ref}>{children}</DrawerContent>
    </Drawer>
  );
};

"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useClickOutside, useKeyPress } from "@siberiacancode/reactuse";
import { useRouter } from "next/navigation";

interface ArtistDrawerProps {
  params: {
    artistId: string;
  };
}

const ArtistDrawer = ({ params }: ArtistDrawerProps) => {
  const router = useRouter();
  const pressedKeys = useKeyPress("Escape");
  const ref = useClickOutside<HTMLDivElement>(() => {
    router.back();
  });

  return (
    <Drawer open={!pressedKeys} onClose={() => router.back()}>
      <DrawerContent ref={ref}>{params.artistId}</DrawerContent>
    </Drawer>
  );
};

export default ArtistDrawer;

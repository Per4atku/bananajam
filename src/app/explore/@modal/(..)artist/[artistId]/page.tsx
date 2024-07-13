"use client";

import { Dialog } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { DialogContent } from "@radix-ui/react-dialog";
import { useKeyPress } from "@siberiacancode/reactuse";
import { useRouter } from "next/navigation";

interface ArtistDrawerProps {
  params: {
    artistId: string;
  };
}

const ArtistDrawer = ({ params }: ArtistDrawerProps) => {
  const router = useRouter();
  const pressedKeys = useKeyPress("Escape");

  return (
    <Drawer open={!pressedKeys} onClose={() => router.back()}>
      <DrawerContent>{params.artistId}</DrawerContent>
    </Drawer>
  );
};

export default ArtistDrawer;

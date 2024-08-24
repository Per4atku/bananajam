"use client";

import { musicDataAPI } from "@/apis/musicDataAPI";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Keyboard, Mousewheel, Scrollbar } from "swiper/modules";
import { useMediaQuery } from "@siberiacancode/reactuse";
import { Button } from "../ui/button";

import "swiper/css";
import "swiper/css/bundle";
import { ReactNode, useState } from "react";

interface AlbumCarouselProps {
  artistId: string;
  fallback?: ReactNode;
}

export const AlbumCarousel = ({ artistId, fallback }: AlbumCarouselProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [activeIndex, setActiveIndex] = useState<number>();

  const { data } = useQuery({
    queryKey: [artistId, "get-artists-albums"],
    queryFn: async () => (await musicDataAPI.getArtistsAlbums(artistId)).data,
  });

  if (!data) return fallback;

  return (
    <div className="flex flex-col items-center ">
      <Swiper
        initialSlide={Math.floor(data.items.length / 2)}
        onRealIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        effect="cards"
        scrollbar={{ draggable: true, dragSize: 30 }}
        width={isSmallScreen ? 192 : 256}
        height={isSmallScreen ? 192 : 256}
        className=" w-48 h-48 mb-4 sm:!ml-6 sm:!mr-6 sm:w-64 sm:h-64 "
        keyboard={{ enabled: true }}
        mousewheel={{ sensitivity: 2, forceToAxis: true }}
        grabCursor
        modules={[EffectCards, Scrollbar, Keyboard, Mousewheel]}
      >
        {data.items.map((album, index) => (
          <SwiperSlide key={index} className="rounded-lg ">
            <div className="flex bg-card flex-col items-center w-48 h-48 justify-center overflow-hidden overflow-ellipsis sm:w-64 sm:h-64">
              <Image
                className="rounded-lg border-border border-2 "
                width={isSmallScreen ? 192 : 256}
                height={isSmallScreen ? 192 : 256}
                src={album.images.at(1)?.url || ""}
                alt={`${album.name} Cover`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col gap-3 text-center mt-4 items-center  ">
        <div>
          <Button>Play</Button>{" "}
          <Button variant={"secondary"}>View Album</Button>
        </div>
        <h3 className="text-xl font-bold w-5/6 overflow-hidden h-14 overflow-ellipsis line-clamp-2 sm:text-2xl sm:h-16 ">
          {data.items.at(activeIndex || 0)?.name}
        </h3>
      </div>
    </div>
  );
};

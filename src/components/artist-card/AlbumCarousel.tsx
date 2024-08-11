"use client";

import { musicDataAPI } from "@/apis/musicDataAPI";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Scrollbar } from "swiper/modules";
import { Card } from "../ui/card";

import "swiper/css";
import "swiper/css/effect-cards";
import { useMediaQuery } from "@siberiacancode/reactuse";

interface AlbumCarouselProps {
  artistId: string;
}

export const AlbumCarousel = ({ artistId }: AlbumCarouselProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const { data } = useQuery({
    queryKey: [artistId, "get-artists-albums"],
    queryFn: async () => (await musicDataAPI.getArtistsAlbums(artistId)).data,
  });
  if (data) {
    return (
      <Swiper
        width={isSmallScreen ? 192 : 256}
        height={isSmallScreen ? 192 : 256}
        className=" w-48 h-48 sm:w-64 sm:h-64"
        grabCursor
        modules={[EffectCards]}
        effect="cards"
        slidesPerView={1}
        loop
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.items.map((album, index) => (
          <SwiperSlide key={index}>
            <Card className=" border-primary w-48 h-48 flex items-center justify-center overflow-hidden overflow-ellipsis sm:w-64 sm:h-64">
              <div className="flex flex-col items-center justify-center gap-1 overflow-hidden sm:gap-4">
                <Image
                  className="rounded-lg"
                  width={isSmallScreen ? 130 : 170}
                  height={isSmallScreen ? 130 : 170}
                  src={album.images.at(1)?.url || ""}
                  alt={`${album.name} Cover`}
                />
                <h3 className="text-center px-1 font-bold text-sm overflow-ellipsis overflow-hidden h-10 sm:h-12 sm:text-base">
                  {album.name}
                </h3>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
};

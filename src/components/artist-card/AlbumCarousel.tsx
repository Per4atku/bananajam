"use client";

import { musicDataAPI } from "@/apis/musicDataAPI";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { Card } from "../ui/card";

import "swiper/css";
import "swiper/css/effect-cards";

interface AlbumCarouselProps {
  artistId: string;
}

export const AlbumCarousel = ({ artistId }: AlbumCarouselProps) => {
  const { data } = useQuery({
    queryKey: [artistId, "get-artists-albums"],
    queryFn: async () => (await musicDataAPI.getArtistsAlbums(artistId)).data,
  });
  if (data) {
    return (
      <Swiper
        className="w-64 h-64"
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
            <Card className=" border-primary w-64 h-64 flex items-center justify-center overflow-hidden overflow-ellipsis">
              <div className="flex flex-col items-center gap-4 overflow-hidden">
                <Image
                  className="rounded-lg"
                  width={170}
                  height={170}
                  src={album.images.at(1)?.url || ""}
                  alt={`${album.name} Cover`}
                />
                <h3 className="text-center px-1 h-12 font-bold">
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

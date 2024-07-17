"use client";

import { musicDataAPI } from "@/apis/musicDataAPI";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useCarousel from "@/hooks/useCarousel";
import { useDidUpdate } from "@siberiacancode/reactuse";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, EffectCube } from "swiper/modules";
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
        grabCursor
        modules={[EffectCards]}
        effect="cards"
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.items.map((album, index) => (
          <SwiperSlide key={index}>
            <Card className=" border-primary  w-80 h-80 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Image
                  className="rounded-lg"
                  width={200}
                  height={200}
                  src={album.images.at(1)?.url || ""}
                  alt={`${album.name} Cover`}
                />
                <h3 className="text-center  font-bold">{album.name}</h3>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
};

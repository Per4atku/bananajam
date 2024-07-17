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

interface AlbumCarouselProps {
  artistId: string;
}

export const AlbumCarousel = ({ artistId }: AlbumCarouselProps) => {
  const { setApi, current, count } = useCarousel();
  const { data } = useQuery({
    queryKey: [artistId, "get-artists-albums"],
    queryFn: async () => (await musicDataAPI.getArtistsAlbums(artistId)).data,
  });
  useDidUpdate(() => {
    console.log(current), [current];
  });
  if (data) {
    return (
      <Carousel
        setApi={setApi}
        className="w-full flex items-center "
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {data.items.map((album, index) => (
            <CarouselItem className="basis-1/3 " key={index}>
              <div className="flex flex-col items-center gap-4">
                <Image
                  className="rounded-lg"
                  width={120}
                  height={120}
                  src={album.images.at(1)?.url || ""}
                  alt={`${album.name} Cover`}
                />
                <h3 className="text-center text-sm  font-bold">{album.name}</h3>
                <p>{index === current && "Current"}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }
};

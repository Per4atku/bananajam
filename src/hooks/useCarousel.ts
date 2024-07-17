import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

interface useCarouselReturn {
  setApi: Dispatch<SetStateAction<CarouselApi>>;
  current: number;
  count: number;
}

const useCarousel = (): useCarouselReturn => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return {
    setApi,
    current,
    count,
  };
};

export default useCarousel;

import { Item, musicDataAPI } from "@/apis/musicDataAPI";
import { useDidUpdate } from "@siberiacancode/reactuse";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

interface useSearchItemProps {
  query: string;
  sort_by: string;
  itemsPerSroll: number;
}

interface useSearchItemReturn {
  items: Item[];
  isError: boolean;
  error: Error | null;
  fetchMore: () => void;
}

export const useSearchItem = ({
  query,
  sort_by,
  itemsPerSroll,
}: useSearchItemProps): useSearchItemReturn => {
  const [items, setItems] = useState<Item[]>([]);

  const { isError, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search-items", sort_by, query],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const queryProps = {
        limit: itemsPerSroll,
        query: query,
        offset: pageParam,
      };
      switch (sort_by) {
        case "artist":
          const fetchedArtists = await musicDataAPI.getArtists({
            ...queryProps,
          });
          setItems((prev) => {
            if (prev) return [...prev, ...fetchedArtists];
            else return [...fetchedArtists];
          });

          return fetchedArtists;

        case "album":
          const fetchedAlbums = await musicDataAPI.getAlbums({ ...queryProps });
          setItems((prev) => {
            if (prev) return [...prev, ...fetchedAlbums];
            else return [...fetchedAlbums];
          });

          return fetchedAlbums;

        case "track":
          const fetchedTracks = await musicDataAPI.getTracks({ ...queryProps });
          setItems((prev) => {
            if (prev) return [...prev, ...fetchedTracks];
            else return [...fetchedTracks];
          });
          return fetchedTracks;
      }
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.length === 0) {
        return undefined;
      }
      return lastPageParam + itemsPerSroll;
    },
  });

  useDidUpdate(() => {
    setItems([]);
  }, [query, sort_by]);

  return {
    items,
    isError,
    error,
    fetchMore: fetchNextPage,
  };
};

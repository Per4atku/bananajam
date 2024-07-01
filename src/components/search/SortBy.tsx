"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { useDidUpdate } from "@siberiacancode/reactuse";

const SortBy = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [sortByItem, setSortByItem] = useState<string>(
    searchParams.get("sort_by") || "artist"
  );

  useDidUpdate(() => {
    const params = new URLSearchParams([
      ["sort_by", sortByItem],
      ["query", searchParams.get("query") || ""],
    ]);
    replace(`${pathname}?${params.toString()}`);
  }, [sortByItem]);

  return (
    <div className="flex gap-3 my-4">
      <button onClick={() => setSortByItem("artist")}>
        <Badge
          className="text-base py-1 px-5 rounded-xl "
          variant={sortByItem === "artist" ? "default" : "secondary"}
        >
          Artist
        </Badge>
      </button>
      <button onClick={() => setSortByItem("album")}>
        <Badge
          className="text-base py-1 px-5 rounded-xl "
          variant={sortByItem === "album" ? "default" : "secondary"}
        >
          Album
        </Badge>
      </button>
      <button onClick={() => setSortByItem("track")}>
        <Badge
          className="text-base py-1 px-5 rounded-xl "
          variant={sortByItem === "track" ? "default" : "secondary"}
        >
          Track
        </Badge>
      </button>
    </div>
  );
};

export default SortBy;

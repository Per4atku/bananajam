"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import clsx from "clsx";

interface SearchProps {
  placeholder: string;
}

const Search = ({ placeholder }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isFocused, setIsFocused] = useState<boolean>();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex relative items-center mt-12">
      <SearchIcon className="absolute left-2 h-5 w-5 text-muted-foreground" />
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={searchParams.get("query")?.toString()}
        placeholder={placeholder}
        className="pl-10 py-7 text-lg"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button
        className={clsx("absolute right-2 h-5 w-5", !isFocused && "hidden")}
        size={"icon"}
        variant={"ghost"}
      >
        <X />
      </Button>
    </div>
  );
};
export default Search;

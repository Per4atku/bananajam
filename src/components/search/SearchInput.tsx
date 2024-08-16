"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useRef } from "react";
import clsx from "clsx";
import { useBoolean, useMount } from "@siberiacancode/reactuse";

interface SearchProps {
  placeholder: string;
}

const SearchInput = ({ placeholder }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isTyping, toggleTyping] = useBoolean();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
      toggleTyping(false);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useMount(() => {
    !!searchParams.get("query") ? toggleTyping(true) : toggleTyping(false);
  });

  return (
    <div className="flex relative items-center mt-12">
      <SearchIcon className="absolute left-2 h-5 w-5 " />
      <Input
        ref={inputRef}
        defaultValue={searchParams.get("query")?.toString()}
        placeholder={placeholder}
        className="pl-10 py-7 text-lg"
        onChange={(e) => {
          toggleTyping(true);
          handleSearch(e.target.value);
        }}
        onFocus={() => toggleTyping(true)}
      />
      <Button
        className={clsx("absolute right-3 h-10 w-10", !isTyping && "hidden")}
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.value = "";
            toggleTyping();

            const params = new URLSearchParams(searchParams);
            params.delete("query");
            replace(`${pathname}?${params.toString()}`);
          }
        }}
      >
        <X className="w-6 h-6" />
      </Button>
    </div>
  );
};
export default SearchInput;

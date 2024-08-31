"use client"

import useParams from "@/hooks/useParams"
import {
  useBoolean,
  useDidUpdate,
  useKeyPress,
  useMount,
} from "@siberiacancode/reactuse"
import clsx from "clsx"
import { Search as SearchIcon, X } from "lucide-react"
import { useRef } from "react"
import { useDebouncedCallback } from "use-debounce"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface SearchProps {
  placeholder: string
}

const SearchInput = ({ placeholder }: SearchProps) => {
  const pressedKeys = useKeyPress("Escape")
  const [isTyping, toggleTyping] = useBoolean()

  const inputRef = useRef<HTMLInputElement | null>(null)
  const resetButtonRef = useRef<HTMLButtonElement | null>(null)

  const searchParams = useParams()

  useDidUpdate(() => {
    if (pressedKeys && searchParams.get("query"))
      resetButtonRef.current?.click()
  }, [pressedKeys])

  const handleSearch = useDebouncedCallback((term) => {
    if (term) {
      searchParams.set("query", term)
    } else {
      searchParams.remove("query")
      toggleTyping(false)
    }
  }, 300)

  useMount(() => {
    !!searchParams.get("query") ? toggleTyping(true) : toggleTyping(false)
  })

  return (
    <div className="flex relative items-center mt-12">
      <SearchIcon className="absolute left-2 h-5 w-5 " />
      <Input
        ref={inputRef}
        defaultValue={searchParams.get("query")?.toString()}
        placeholder={placeholder}
        className="pl-10 py-7 text-lg"
        onChange={(e) => {
          toggleTyping(true)
          handleSearch(e.target.value)
        }}
        onFocus={() => toggleTyping(true)}
      />
      <Button
        ref={resetButtonRef}
        className={clsx("absolute right-3 h-10 w-10", !isTyping && "hidden")}
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.value = ""
            toggleTyping()

            searchParams.remove("query")
          }
        }}
      >
        <X className="w-6 h-6" />
      </Button>
    </div>
  )
}
export default SearchInput

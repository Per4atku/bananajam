import { usePathname, useRouter, useSearchParams } from "next/navigation"

const useParams = () => {
  const searchParamsInstance = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = new URLSearchParams(searchParamsInstance)

  const set = (key: string, value: string) => {
    searchParams.set(key, value)
    replace(`${pathname}?${searchParams.toString()}`)
  }
  const remove = (key: string) => {
    searchParams.delete(key)
    replace(`${pathname}?${searchParams.toString()}`)
  }

  const reset = () => {
    replace(pathname)
  }

  const get = (key: string) => {
    return searchParams.get(key)
  }

  return { set, remove, get, reset }
}

export default useParams

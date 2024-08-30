import { spotifyApi } from "@/utils/api/instance"

export default async function Page() {
  const data = await spotifyApi.get("recommendations/available-genre-seeds", {
    headers: {
      Authorization:
        "Bearer BQDxlv5hig0D87VzCk1Zi5SHFhLmEG5Ko8PKMmGQTfw0QShZl7KFkQADW1U8Z1JmYBqfqHen7blwgSkeUg7kwG-7AOiak_0kxunevpin7Fe0KgH_dMI",
    },
    params: {
      query: "a",
    },
    cache: "no-cache",
  })
  console.log(data)
  return <div>123</div>
}

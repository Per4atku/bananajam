import { spotifyApi } from "@/utils/api/instance"

export default async function Page() {
  const data = await spotifyApi.get("recommendations/available-genre-seeds", {
    headers: {
      Authorization:
        "Bearer BQAhw0mAmCL9Zg3voMoMcLSsZ8oYp93G6nIlaoQ4ynidwGQMFirnMR-kxkfLcJT2ELW36oKXKIu4fLNIjYmi9H6C0iw2TgfXxgQTW8KjvTlm5Sy80Ss",
    },
    params: {
      query: "a",
    },
    cache: "no-cache",
  })
  console.log(data)
  return <div>123</div>
}

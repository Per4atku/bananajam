import { useEffect } from "react"

const Page = async () => {
  const result = await fetch("http://localhost:3000/api/token")
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
    })

  console.log(result)

  return <div>test for cookies</div>
}

export default Page

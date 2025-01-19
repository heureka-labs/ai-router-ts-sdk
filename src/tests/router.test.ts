import { AiRouter } from "../router"

test("AiRouter", async () => {
  const client = new AiRouter("sk12345", "http://localhost:4000")
  const result = await client.getBestModel([1, 2, 3], "fastembed")
})

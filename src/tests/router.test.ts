import { AiRouter } from "../router"
import * as dotenv from "dotenv"

// Requires actual ai router to be running under localhost:4000
test("AiRouter", async () => {
  dotenv.config()
  const client = new AiRouter(
    process.env.AI_ROUTER_API_KEY,
    "http://localhost:4000",
  )
  const result = await client.getBestModel({
    messages: [{ role: "user", content: "Hey how are you doing?" }],
  })
  console.log({ result })

  const result2 = await client.getBestModel({
    embedding: [0.1, 0.2, 0.3],
    embeddingType: "text-embedding-3-small",
  })
  console.log({ result2 })
})

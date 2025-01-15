import OpenAI from "openai"
import { AiRouterChat } from "./chat"

export class AiRouter extends OpenAI {
  constructor(apiKey: string) {
    const baseURL = "http://localhost:4000"
    super({ apiKey, baseURL })

    this.chat = new AiRouterChat(this)
  }
}

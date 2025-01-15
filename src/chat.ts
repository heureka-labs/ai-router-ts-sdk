import { Chat } from "openai/resources"
import { AiRouterCompletions } from "./completions"

export class AiRouterChat extends Chat {
  completions = new AiRouterCompletions(this._client)
}

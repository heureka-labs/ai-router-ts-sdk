import type { AiRouterModel } from "./types/model"
import type { AiEmbeddingModel } from "./types/embeddingModel"

export class AiRouter {
  private apiKey: string
  private baseUrl: string
  constructor(apiKey?: string, baseUrl?: string) {
    if (!apiKey) {
      // check env for api key
      apiKey = process.env.AI_ROUTER_API_KEY
      if (!apiKey) {
        throw new Error("API key is required")
      }
    }
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  public async getBestModel(
    embeddings: number[],
    embeddingModel: AiEmbeddingModel,
  ): Promise<AiRouterModel> {
    const response = await fetch(`${this.baseUrl}/models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ embeddings, embeddingModel }),
    })
    if (!response.ok) {
      throw new Error("Failed to fetch models")
    }
    const data = await response.json()
    return data
  }
}
